import Sequelize, { Op, QueryTypes } from 'sequelize'
import { compact, mean } from 'lodash'
import {
  ALT_IS_MOUNTAIN,
  CRITERIONS,
  CRIT_CAMPAGNE,
  CRIT_EXTRA_LARGE_CITY,
  CRIT_LARGE_CITY,
  CRIT_MEDIUM_CITY,
  CRIT_MOUNTAIN,
  CRIT_SIDE_SEA,
  CRIT_SMALL_CITY,
  CRIT_SUN,
  IS_LARGE_CITY,
  IS_MEDIUM_CITY,
  IS_SMALL_CITY,
  IS_SUNNY,
  SIDE_SEA,
  HIGH_OPPORTUNITY
} from '../constants/criterion'
import {
  getFranceShape,
  getFrenchWeatherStation,
  loadWeatherFile,
  wikipediaDetails,
  getTensionsCities,
  getCrawledImageCity,
  getAllRegions,
  getCitiesRent,
  getAveragePricing,
  getAverageHouseRent,
} from '../utils/api'
import { distanceBetweenToCoordinates, sleep } from '../utils/utils'
import { NO_DESCRIPTION_MSG } from '../constants/messages'

export default (sequelizeInstance, Model) => {
  Model.franceShape = null
  Model.weatherStationList = null
  Model.averageTemperatureCache = {}
  Model.cityOnSync = false
  Model.cacheLoadAveragePricing = null
  Model.cacheLoadAverageHouseTension = null
  Model.cacheLoadAverageHouseRent = null

  Model.syncCities = async ({ cities }) => {
    const regions = await getAllRegions()
    const oldToNewRegions = [
      // { old: '01', new: '01', },
      // { old: '02', new: '02', },
      // { old: '03', new: '03', },
      // { old: '04', new: '04', },
      // { old: '06', new: '06', },
      // { old: '11', new: '11', },
      // { old: '24', new: '24', },
      // { old: '52', new: '52', },
      // { old: '53', new: '53', },
      // { old: '93', new: '93', },
      // { old: '94', new: '94', },
      { old: '26', new: '27', },
      { old: '43', new: '27', },
      { old: '23', new: '28', },
      { old: '25', new: '28', },
      { old: '22', new: '32', },
      { old: '31', new: '32', },
      { old: '21', new: '44', },
      { old: '41', new: '44', },
      { old: '42', new: '44', },
      { old: '72', new: '75', },
      { old: '82', new: '84', },
      { old: '83', new: '84', },
      { old: '54', new: '75', },
      { old: '74', new: '75', },
      { old: '73', new: '76', },
      { old: '91', new: '76', },
    ];

    const citiesRent = await getCitiesRent()
    let citiesNotUsedNames = citiesRent.map(city => city.city)

    const data = cities
      .sort((a, b) => b.population - a.population)
      .map((city) => {
        let cityRent = null
        if (city.commune.includes("ARRONDISSEMENT")) {
          cityRent = citiesRent.find(r => (city.commune.includes(r.city)))
        } else if (citiesNotUsedNames.includes(city.commune.replaceAll('-', ' '))) {
          cityRent = citiesRent.find(r => (r.city === city.commune.replaceAll('-', ' ')))
          citiesNotUsedNames = citiesNotUsedNames.filter(cityName => cityName !== cityRent.city)
        }
        
        const oldNewRegion = oldToNewRegions.find(region => region.old === `${city.code_region}`)
        const codeRegion = (oldNewRegion ? oldNewRegion.new : city.code_region)
        const region = regions.find(r => `${r.code}` === `${codeRegion}`)
        const nomRegion = region ? region.name : city.region

        const postalCode = city.code_postal.split('/')[0]

        return {
          code_comm: city.code_commune,
          nom_dept: city.departement,
          statut: city.statut,
          z_moyen: city.altitude_moyenne,
          nom_region: nomRegion,
          code_region: codeRegion,
          insee_com: city.code_insee,
          code_dept: city.code_departement,
          geo_point_2d_x: city.geo_point_2d
            ? city.geo_point_2d.split(',')[0]
            : null,
          geo_point_2d_y: city.geo_point_2d
            ? city.geo_point_2d.split(',')[1]
            : null,
          postal_code: postalCode,
          id_geofla: city.id_geofla,
          code_cant: city.code_canton,
          superficie: city.superficie,
          nom_comm: city.commune,
          code_arr: city.code_arrondissement,
          population: city.population,
          total_social_housing: isNaN(parseInt(city.lgt_sociaux, 10))
            ? null
            : parseInt(city.lgt_sociaux, 10),
          rent_t2: ((cityRent && cityRent.rent_t2) ? +(cityRent.rent_t2) : null),
          rent_t4: ((cityRent && cityRent.rent_t4) ? +(cityRent.rent_t4) : null)
        }
      })

    await Model.bulkCreate(data, {
      updateOnDuplicate: [
        'nom_region',
        'postal_code',
        'total_social_housing',
        'rent_t2',
        'rent_t4'
      ],
    }) // updateOnDuplicate == les champs a MaJ si id déja existant
    await Model.addSpecialCities()

    return {
      'nb read': cities.length,
    }
  }

  /*
    Quick way to add the 3 missing major cities into the db
  */
  Model.addSpecialCities = async () => {
    const fields = [
      'code_comm',
      'nom_dept',
      'statut',
      'z_moyen',
      'nom_region',
      'code_dept',
      'geo_point_2d_x',
      'geo_point_2d_y',
      'postal_code',
      'id_geofla',
      'code_cant',
      'superficie',
      'code_arr',
      'created_at',
      'updated_at',
      'deleted_at',
      'distance_from_sea',
      'average_temperature',
      'description',
      'city_house_tension',
      'average_houserent',
      'cache_living_environment',
      'photo',
      'average_houseselled',
      'total_social_housing',
    ].join(', ')

    const POPULATION_MARSEILLE = 861.6
    const POPULATION_LYON = 513.2
    const POPULATION_PARIS = 2161

    const CODE_INSEE_LYON_FIRST_DISTRICT = '69381'
    const CODE_INSEE_PARIS_FIRST_DISTRICT = '75101'
    const CODE_INSEE_MARSEILLE_FIRST_DISTRICT = '13201'

    const CODE_INSEE_LYON = '69123'
    const CODE_INSEE_PARIS = '75056'
    const CODE_INSEE_MARSEILLE = '13055'

    Promise.all([
      // Add major cities missing
      sequelizeInstance.query(
        `INSERT INTO cities (${fields}, nom_comm, population, insee_com) (SELECT ${fields}, "LYON", ${POPULATION_LYON}, "${CODE_INSEE_LYON}" from cities WHERE insee_com = "${CODE_INSEE_LYON_FIRST_DISTRICT}" LIMIT 1) ON CONFLICT (id) DO NOTHING`
      ),
      sequelizeInstance.query(
        `INSERT INTO cities (${fields}, nom_comm, population, insee_com) (SELECT ${fields}, "PARIS", ${POPULATION_PARIS}, "${CODE_INSEE_PARIS}" from cities WHERE insee_com = "${CODE_INSEE_PARIS_FIRST_DISTRICT}" LIMIT 1) ON CONFLICT (id) DO NOTHING`
      ),
      sequelizeInstance.query(
        `INSERT INTO cities (${fields}, nom_comm, population, insee_com) (SELECT ${fields}, "MARSEILLE", ${POPULATION_MARSEILLE}, "${CODE_INSEE_MARSEILLE}" from cities WHERE insee_com = "${CODE_INSEE_MARSEILLE_FIRST_DISTRICT}" LIMIT 1) ON CONFLICT (id) DO NOTHING`
      ),

      sequelizeInstance.query(
        `UPDATE cities SET population = ${POPULATION_MARSEILLE} WHERE nom_comm LIKE "Marseille%arrondissement%"`
      ),
      sequelizeInstance.query(
        `UPDATE cities SET population = ${POPULATION_LYON} WHERE nom_comm LIKE "Lyon%arrondissement%"`
      ),
      sequelizeInstance.query(
        `UPDATE cities SET population = ${POPULATION_PARIS} WHERE nom_comm LIKE "Paris%arrondissement%"`
      ),
    ])
  }

  Model.search = async ({
    codeRegion,
    codeCriterion = [],
    codeRome = [],
    onlySearchInTension = true,
    order,
    offset = 0,
    opportunity = undefined,
  }) => {
    /*
      https://github.com/sequelize/sequelize/issues/9869
      prevents us from using limit / offset correctly in this query, so we truncate manually in the js
      once the issue is fixed, adding the parameters to the query will improve performance
    */

    const usedCriterions = codeCriterion.map((key) =>
      CRITERIONS.find((criterion) => criterion.key === key)
    )
    const whereAnd = usedCriterions.reduce((prev, criterion) => {
      switch (criterion.key) {
        case CRIT_CAMPAGNE:
          return prev.concat([
            {
              distance_from_sea: { [Op.gte]: SIDE_SEA },
            },
            {
              population: { [Op.lte]: IS_SMALL_CITY },
            },
            {
              z_moyen: { [Op.lte]: ALT_IS_MOUNTAIN },
            },
          ])
        case CRIT_MOUNTAIN:
          return prev.concat({
            z_moyen: { [Op.gte]: ALT_IS_MOUNTAIN },
          })
        case CRIT_SMALL_CITY:
          return prev.concat({
            population: { [Op.lte]: IS_SMALL_CITY },
          })

        case CRIT_MEDIUM_CITY:
          return prev.concat([
            {
              population: { [Op.gt]: IS_SMALL_CITY },
            },
            {
              population: { [Op.lt]: IS_MEDIUM_CITY },
            },
          ])

        case CRIT_LARGE_CITY:
          return prev.concat([
            {
              population: { [Op.gte]: IS_MEDIUM_CITY },
            },
            {
              population: { [Op.lt]: IS_LARGE_CITY },
            },
          ])

        case CRIT_EXTRA_LARGE_CITY:
          return prev.concat({
            population: { [Op.gte]: IS_LARGE_CITY },
          })

        case CRIT_SIDE_SEA:
          return prev.concat({
            distance_from_sea: { [Op.lte]: SIDE_SEA },
          })

        case CRIT_SUN:
          return prev.concat({
            average_temperature: { [Op.lte]: IS_SUNNY },
          })

        default:
          return prev
      }
    }, [])

    if (codeRegion) {
      whereAnd.push({ code_region: { [Op.eq]: codeRegion } })
    }

    let bassinsToInclude = []

    if (onlySearchInTension) {
      bassinsToInclude.push({
        attributes: ['ind_t'],
        model: Model.models.tensions,
        required: true,
        where: {
          rome: codeRome,
          ...(!!opportunity && {ind_t: opportunity == HIGH_OPPORTUNITY ? ({[Op.lt]: 4}) : ({[Op.gte]: 4}) })
        },
      })
    }

    const result = await Model.findAll({
      where: {
        [Op.and]: whereAnd,
      },
      logging: process.env.ENABLE_DB_LOGGING ? console.log : false,
      include: [
        {
          attributes: [],
          model: Model.models.bassins,
          required: true,
          include: bassinsToInclude,
        },
      ],
      // order : 1 - tension sur le métier > 2 - custom order (montagne, mer...) > 3 - population
      order: [
        [sequelizeInstance.models.bassins, sequelizeInstance.models.tensions, 'ind_t', 'ASC'],
        ...(!!order ? order : []),
        ['population', 'DESC']
      ],
      raw: true,
    })

    // Once the github Sequelize issue is resolved
    // return both the result of a findAll() and a count()
    return Promise.all([result.slice(offset, offset + 10), result.length])
  }

  Model.getCity = async ({ insee }) => {
    const city = await Model.findOne({
      where: { insee_com: insee },
      include: [Model.models.equipments, Model.models.regions, Model.models.departements],
    })

    if (city) {
      city.nom_comm = (city.nom_comm || '')
        .replace(/--/gi, '-')
        .replace(/-1er-arrondissement/gi, '')
    }

    return city
  }

  Model.getCitiesForAutoComplete = async (query) =>
    await Model.findAll({
      attributes: ['nom_comm', 'insee_com', 'postal_code'],
      where: {
        nom_comm: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('nom_comm')),
              'LIKE',
              `${query}%`
            ),
            Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('nom_comm')),
              'NOT LIKE',
              '%-ARRONDISSEMENT'
            ),
          ],
        },
      },
      order: ['nom_comm'],
      limit: 10,
    })

  Model.checkAndStartSyncCity = () => {
    if (!Model.cityOnSync) {
      Model.syncOneCity()
    }
  }

  Model.syncOneCity = async () => {
    Model.cityOnSync = true

    const cities = await Model.findAll({
      order: [['population', 'DESC']],
      logging: false,
    })

    for (let i = 0; i < cities.length; i++) {
      let city = cities[i]
      let options = {}
      console.log(
        `[START] Sync city ${city.dataValues.id} - ${city.dataValues.nom_comm}`
      )
      if (city.dataValues.distance_from_sea === null) {
        options.distance_from_sea = Model.distanceFromSea(
          city.dataValues.geo_point_2d_x,
          city.dataValues.geo_point_2d_y
        )
      }

      if (city.dataValues.average_temperature === null) {
        options.average_temperature = await Model.averageTemperature(
          city.dataValues.geo_point_2d_x,
          city.dataValues.geo_point_2d_y
        )
      }

      // mise à jour systématique
      const { photo, description } = await Model.getDescription(city.nom_comm)
      options.photo = photo
      options.description = description

      if (city.dataValues.average_houseselled === null) {
        options.average_houseselled = await Model.getAveragePricing(
          city.insee_com
        )
      }

      if (city.dataValues.average_houserent === null) {
        options.average_houserent = await Model.getAverageHouseRent(
          city.insee_com
        )
      }

      if (city.dataValues.city_house_tension === null) {
        options.city_house_tension = await Model.getCityHouseTension(
          city.insee_com
        )
      }

      await city.update(options)
      console.log(`[DONE] Sync city ${city.id}`)

      // pour l'instant on conserve le sleep au cas où
      await sleep(700) // wait and restart command
    }
    Model.cityOnSync = false
  }

  Model.distanceFromSea = (lat, long) => {
    if (!Model.franceShape) {
      Model.franceShape = getFranceShape()
    }
    let minDistance = null
    Model.franceShape.map((coordinate) => {
      let dist = distanceBetweenToCoordinates(
        coordinate[1],
        coordinate[0],
        lat,
        long,
        'K'
      )
      if (dist < 0) {
        dist *= -1
      }

      if (dist < minDistance || !minDistance) {
        minDistance = dist
      }
    })

    return minDistance
  }

  Model.averageTemperature = async (lat, long) => {
    if (!Model.weatherStationList) {
      Model.weatherStationList = await getFrenchWeatherStation()
    }

    let minDistance = null
    let stationId = null
    let stationIndex = null
    Model.weatherStationList.map((station, index) => {
      let dist = distanceBetweenToCoordinates(
        +station.latitude.replace(',', '.'),
        +station.longitude.replace(',', '.'),
        lat,
        long,
        'K'
      )
      if (dist < 0) {
        dist *= -1
      }

      if (dist < minDistance || !minDistance) {
        minDistance = dist
        stationId = station.numero
        stationIndex = index
      }
    })

    // cache http and calcul
    if (Model.averageTemperatureCache[stationId]) {
      return Model.averageTemperatureCache[stationId]
    }

    try {
      if (stationId) {
        console.log(`load station file => id: ${stationId}`)
        const file = await loadWeatherFile(stationId)
        const findLineIndex = file.findIndex(
          (l) => l.indexOf('Température moyenne') !== -1
        )
        let temperatureLine = file[findLineIndex + 1]
        if (temperatureLine.indexOf('Statistiques') !== -1) {
          // escape information line
          temperatureLine = file[findLineIndex + 2]
        }

        const allTemps = []
        temperatureLine
          .replace(/(\r\n|\n|\r)/gm, '')
          .split(';')
          .map((temp) => {
            if (+temp) {
              allTemps.push(+temp)
            }
          })
        const meanCalc = mean(allTemps)
        Model.averageTemperatureCache[stationId] = meanCalc
        if ((meanCalc || null) === null) {
          throw 'File not found'
        } else {
          return meanCalc
        }
      }
    } catch (err) {
      // if file is broken or not exist
      Model.weatherStationList.splice(stationIndex, 1)
      return await Model.averageTemperature(lat, long)
    }
  }

  Model.getDescription = async (cityName) => {
    const cityDetails = await wikipediaDetails(cityName)
    let description = NO_DESCRIPTION_MSG
    let photoPage = null
    if (cityDetails && cityDetails.pageid) {
      photoPage = await getCrawledImageCity(cityDetails.pageid)
    }

    if (cityDetails && cityDetails.extract) {
      description = (cityDetails.extract || '')
        .replace(/\((.*?)\)/gim, '')
        .replace(/\[(.*?)\]/gim, '')
    }

    let photo = photoPage
    if (
      photo == null &&
      cityDetails &&
      cityDetails.original &&
      cityDetails.original.source
    ) {
      photo = cityDetails.original.source
    }

    console.log('Model.getDescription photo : ' + photo)

    return {
      description,
      photo,
    }
  }

  Model.searchCloseCities = async ({
    latitude,
    longitude,
    inseeCode,
  }) => {
    const cities = await Model.findAll({
      where: {
        [Op.and]: [
          { geo_point_2d_x: { [Op.lt]: latitude + 0.5 } },
          { geo_point_2d_x: { [Op.gt]: latitude - 0.5 } },
          { geo_point_2d_y: { [Op.lt]: longitude + 0.5 } },
          { geo_point_2d_y: { [Op.gt]: longitude - 0.5 } },
          { insee_com: { [Op.notLike]: inseeCode } },
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('nom_comm')),
            'NOT LIKE',
            '%-ARRONDISSEMENT'
          ),
        ],
      },
      include: [
        {
          attributes: ['name'],
          model: Model.models.regions,
          required: true,
        },
      ],
      order: [['population', 'desc']],
      raw: true,
    })

    /*
      https://github.com/sequelize/sequelize/issues/9869
      prevents us from using limit / offset correctly in this query, so we truncate manually in the js
      once the issue is fixed, adding the parameters to the query will improve performance
    */
    return cities.slice(0, 6).map((city) => {
      let distance = distanceBetweenToCoordinates(
        city.geo_point_2d_x,
        city.geo_point_2d_y,
        latitude,
        longitude,
        'K'
      )
      if (distance < 0) {
        distance *= -1
      }

      return {
        ...city,
        distance,
      }
    })
  }

  Model.searchSimilarCities = async ({ city, codeRome }) => {
    const citySizeType =
      city.population < IS_SMALL_CITY
        ? CRIT_SMALL_CITY
        : city.population < IS_MEDIUM_CITY
        ? CRIT_MEDIUM_CITY
        : city.population < IS_LARGE_CITY
        ? CRIT_LARGE_CITY
        : CRIT_EXTRA_LARGE_CITY

    const isCloseToSea = city.distance_from_sea < SIDE_SEA
    const isMountain = city.z_moyen > ALT_IS_MOUNTAIN
    const isCampaign =
      city.z_moyen <= ALT_IS_MOUNTAIN &&
      city.distance_from_sea >= SIDE_SEA &&
      city.population < IS_SMALL_CITY

    const criterions = compact([
      citySizeType,
      isCloseToSea && CRIT_SIDE_SEA,
      isCampaign && CRIT_CAMPAGNE,
      isMountain && CRIT_MOUNTAIN,
    ])

    const where = (criterions.includes(CRIT_SMALL_CITY) ? "`cities`.`population` <= '20'"
      : criterions.includes(CRIT_MEDIUM_CITY) ? "`cities`.`population` > '20' AND `cities`.`population` < '50'"
      : criterions.includes(CRIT_LARGE_CITY) ?  "`cities`.`population` >= '50' AND `cities`.`population` < '200'"
      : "`cities`.`population` >= '200'")
      + (criterions.includes(CRIT_SIDE_SEA) ? " AND `cities`.`distance_from_sea` <= 30" : "")
      + (criterions.includes(CRIT_CAMPAGNE) ? " AND `cities`.`distance_from_sea` >= 30 AND `cities`.`population` <= '20' AND `cities`.`z_moyen` <= 600" : "")
      + (criterions.includes(CRIT_MOUNTAIN) ? " AND `cities`.`z_moyen` > 600" : "")
      + " AND `cities`.`id` != " + city.id
      + " AND `cities`.`nom_comm` NOT LIKE '%-ARRONDISSEMENT'"

    const cities = await sequelizeInstance.query("\
      SELECT\
        `cities`.`id`,\
        `cities`.`insee_com`,\
        `cities`.`nom_comm`\
      FROM\
        `cities` AS `cities`\
      INNER JOIN `bassins` AS `bassin` ON\
        `cities`.`insee_com` = `bassin`.`code_commune_insee`\
        AND (`bassin`.`deleted_at` IS NULL)\
      INNER JOIN (SELECT * from `tensions`\
        WHERE (`tensions`.`deleted_at` IS NULL\
          AND `tensions`.`rome` = '" + codeRome + "')\
        ORDER BY\
          `tensions`.`ind_t` ASC) AS `bassin->tensions` on `bassin`.`bassin_id` = `bassin->tensions`.`bassin_id`\
      WHERE\
        (" + where + ")\
      ORDER BY\
        `bassin->tensions`.`ind_t` ASC,\
        `cities`.`population` DESC\
      LIMIT 6;\
    ", {
      type: QueryTypes.SELECT
    });

    return {
      result: cities,
      criterions
    }
  }

  Model.getCityHouseTension = async (cityInsee) => {
    let allIntoFile = Model.cacheLoadAverageHouseTension
    if (!allIntoFile) {
      allIntoFile = await getTensionsCities()
      Model.cacheLoadAverageHouseTension = allIntoFile
    }

    const find = allIntoFile.find((c) => c.codeInsee === cityInsee)
    if (find) {
      return find.frais
    }

    return 0
  }

  Model.getAveragePricing = async (cityInsee) => {
    let allIntoFile = Model.cacheLoadAveragePricing
    if (!allIntoFile) {
      allIntoFile = await getAveragePricing()
      Model.cacheLoadAveragePricing = allIntoFile
    }

    const find = allIntoFile.find((c) => c.insee_com === cityInsee)
    if (find && Number(find.prixmoyen_m2)) {
      return find.prixmoyen_m2
    }

    return 0
  }

  Model.getAverageHouseRent = async (cityInsee) => {
    let allIntoFile = Model.cacheLoadAverageHouseRent
    if (!allIntoFile) {
      allIntoFile = await getAverageHouseRent()
      Model.cacheLoadAverageHouseRent = allIntoFile
    }

    const find = allIntoFile.find((c) => c.insee === +cityInsee + '')
    if (find && find.loypredm2) {
      return parseFloat(find.loypredm2.replace(/,/g, '.'))
    }

    return 0
  }

  Model.getCitiesByCodeRegion = async ({ codeRegion }) => {
    return await Model.findAll({
      where: { code_region: parseInt(codeRegion) }
    })
  }

  return Model
}
