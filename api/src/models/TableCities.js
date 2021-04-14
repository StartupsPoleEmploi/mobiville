import { Op } from 'sequelize'
import { groupBy, mean, sortBy } from 'lodash'
import { ALT_IS_MOUNTAIN, CODE_ROMES, CRITERIONS, CRIT_CAMPAGNE, CRIT_EXTRA_LARGE_CITY, CRIT_LARGE_CITY, CRIT_MEDIUM_CITY, CRIT_MOUNTAIN, CRIT_SIDE_SEA, CRIT_SMALL_CITY, CRIT_SUN, IS_LARGE_CITY, IS_MEDIUM_CITY, IS_SMALL_CITY, IS_SUNNY, SIDE_SEA, WEIGHT_REGION } from '../constants/criterion'
import { getAveragePricing, getFranceShape, getFrenchWeatherStation, loadWeatherFile, wikipediaDetails, getTensionsCities, getAverageHouseRent } from '../utils/api'
import { citySizeLabel, distanceBetweenToCoordinates, sleep } from '../utils/utils'
import { NO_DESCRIPTION_MSG } from '../constants/messages'
import { ALL_LIFE_CRITERIONS_LIST } from '../constants/lifeCriterions'

export default (sequelizeInstance, Model) => {
  Model.franceShape = null
  Model.weatherStationList = null
  Model.averageTemperatureCache = {}
  Model.cityOnSync = false
  Model.cacheSearchCities = {}
  Model.cacheLoadAveragePricing = null
  Model.cacheLoadAverageHouseTension = null
  Model.cacheLoadAverageHouseRent = null

  Model.syncCities = async ({cities}) => {
    await Model.deleteAll()

    for(let i = 0; i < cities.length; i++) {
      const city = cities[i]

      const jsonToUpdate = {
        code_comm: city.code_commune,
        nom_dept: city.departement,
        statut: city.statut,
        z_moyen: city.altitude_moyenne,
        nom_region: city.region,
        code_reg: city.code_region,
        insee_com: city.code_insee,
        code_dept: city.code_departement,
        geo_point_2d_x: city.geo_point_2d ? city.geo_point_2d.split(',')[0] : null,
        geo_point_2d_y: city.geo_point_2d ? city.geo_point_2d.split(',')[1] : null,
        postal_code: city.code_postal,
        id_geofla: city.id_geofla,
        code_cant: city.code_canton,
        superficie: city.superficie,
        nom_comm: city.commune,
        code_arr: city.code_arrondissement,
        population: city.population,
      }

      await Model.create(jsonToUpdate)
    }

    return {
      'nb read': cities.length,
    }
  }

  Model.regions = async () => {
    if(Model.cacheSearchCities['cache-regions']) {
      return Model.cacheSearchCities['cache-regions']
    }

    const list = await Model.models.regions.findAll({
      group: ['new_code'],
      raw: true,
    })

    for(let c = 0; c < CRITERIONS.length; c++) {
      for(let r = 0; r < CODE_ROMES.length; r++) {
        const citiesGrouped = groupBy((await Model.search({codeCriterion: [CRITERIONS[c].key], codeRome: [CODE_ROMES[r].key]})), 'region.new_code')
        Object.keys(citiesGrouped).map(v => {
          const findIndex = list.findIndex(r => r.new_code === v)
          if(findIndex !== -1) {
            const allCriterions = list[findIndex].criterions || {}
            const criterions = allCriterions[CODE_ROMES[r].key] || []
            criterions.push(CRITERIONS[c].key)
            allCriterions[CODE_ROMES[r].key] = criterions
            list[findIndex].criterions = allCriterions
          }
        })    
      }
    }

    Model.cacheSearchCities['cache-regions'] = sortBy(list.map(r => ({id: r.new_code, label: r.new_name, criterions: r.criterions})), ['label'])
    return Model.cacheSearchCities['cache-regions']
  }

  Model.regionHasTension = async (regionId, codeRome) => {
    const allOldRegions = (await Model.models.regions.getCodeRegOfOldRegion(regionId))
    const l = (await Model.allTensionsCities({
      where: {
        code_reg : allOldRegions,
      },
      codeRome: [codeRome],
    }))

    return l.length !== 0
  }

  Model.allTensionsCities = async ({where, codeRome, methodName = 'findAll'}) => {
    return await Model[methodName]({
      where: {
        ...where,
      },
      group: ['id'],
      include: [{
        attributes: [],
        model: Model.models.bassins,
        required: true,
        include: [{
          attributes: [],
          model: Model.models.tensions,
          require: true,
          where: {
            rome: codeRome,
          },
          order: [['ind_t', 'desc']],
        }],
      }, {
        model: Model.models.regions,
        require: true,
      }],
      raw: true,
    })
  }

  Model.search = async ({codeRegion = [], codeCriterion = [], codeRome = []}) => {
    const list = []
    let maxWeight = 0
    if(Model.cacheSearchCities[JSON.stringify({codeRegion, codeCriterion, codeRome})]) {
      return Model.cacheSearchCities[JSON.stringify({codeRegion, codeCriterion, codeRome})]
    }

    // criterions
    for(let i = 0; i < codeCriterion.length; i++) {
      const crit = codeCriterion[i]
      const const_crit = CRITERIONS.find(c => c.key === crit) || { weight: 1 }
      maxWeight += const_crit.weight
      if(Model.cacheSearchCities[JSON.stringify({crit, codeRome})]) {
        list.push(Model.cacheSearchCities[JSON.stringify({crit, codeRome})])
      } else {
        let l = []

        switch(crit) {
        case CRIT_CAMPAGNE:
          l = (await Model.allTensionsCities({
            where: {
              [Op.and]: [{
                distance_from_sea : {[Op.gte]: SIDE_SEA},
              }, {
                population : {[Op.lte]: IS_SMALL_CITY},
              }, {
                z_moyen : {[Op.lte]: ALT_IS_MOUNTAIN},
              }],                
            },
            codeRome,
          }))
          break
        case CRIT_MOUNTAIN:
          l = (await Model.allTensionsCities({
            where: {
              z_moyen : {[Op.gte]: ALT_IS_MOUNTAIN},
            },
            codeRome,
          }))
          break
        case CRIT_SMALL_CITY:
          l = (await Model.allTensionsCities({
            where: {
              population : {[Op.lte]: IS_SMALL_CITY},
            },
            codeRome,
          }))
          break
        case CRIT_MEDIUM_CITY:
          l = (await Model.allTensionsCities({
            where: {
              [Op.and]: [{
                population : {[Op.gt]: IS_SMALL_CITY},
              }, {
                population : {[Op.lt]: IS_MEDIUM_CITY},
              }]},
            codeRome,
          }))
          break
        case CRIT_LARGE_CITY:
          l = (await Model.allTensionsCities({
            where: {
              [Op.and]: [{
                population : {[Op.gt]: IS_MEDIUM_CITY},
              }, {
                population : {[Op.lt]: IS_LARGE_CITY},
              }]},
            codeRome,
          }))
          break
        case CRIT_EXTRA_LARGE_CITY:
          l = (await Model.allTensionsCities({
            where: {
              population : {[Op.gte]: IS_LARGE_CITY},
            },
            codeRome,
          }))
          break
        case CRIT_SIDE_SEA:
          l = (await Model.allTensionsCities({
            where: {
              distance_from_sea : {[Op.lte]: SIDE_SEA},
            },
            codeRome,
          }))
          break
        case CRIT_SUN:
          l = (await Model.allTensionsCities({
            where: {
              average_temperature : {[Op.lte]: IS_SUNNY},
            },
            codeRome,
          }))
          break
        }

        // add default values
        l = l.map(c => ({...c, tags: [crit], weight: const_crit.weight }))

        Model.cacheSearchCities[JSON.stringify({crit, codeRome})] = l
        list.push(Model.cacheSearchCities[JSON.stringify({crit, codeRome})])
      }
    }

    // all regions
    for(let i = 0; i < codeRegion.length; i++) {
      const reg = codeRegion[i]
      maxWeight += WEIGHT_REGION
      const jsonRegions = JSON.stringify({reg: +reg, codeRome})

      if(Model.cacheSearchCities[jsonRegions]) {
        list.push(Model.cacheSearchCities[jsonRegions])
      } else {
        const allOldRegions = (await Model.models.regions.getCodeRegOfOldRegion(reg))

        const l = (await Model.allTensionsCities({
          where: {
            code_reg : allOldRegions,
          },
          codeRome,
        })).map(c => ({...c, tags: ['reg_' + reg], weight: WEIGHT_REGION}))

        Model.cacheSearchCities[jsonRegions] = l
        list.push(Model.cacheSearchCities[jsonRegions])
      }
    }

    let totalTags = codeCriterion.length + codeRegion.length
    if(totalTags === 0) {
      // no criterions
      list.push((await Model.allTensionsCities({
        codeRome,
      })).map(c => ({...c, tags: ['default'], weight: 1})))
    }

    // merge lists
    let mergedList = []
    const tempIndex = {}
    const listLength = list.length
    for(let x = 0; x < listLength; x++) {
      const typeOfList = list[x]

      const typeLength = typeOfList.length
      for(let y = 0; y < typeLength; y++) {
        const city = typeOfList[y]

        if(tempIndex[city.id]) {
          const findIndex = tempIndex[city.id]
          const weight = mergedList[findIndex].weight + city.weight
          mergedList[findIndex].tags = mergedList[findIndex].tags.concat(city.tags)
          mergedList[findIndex].weight = weight
        } else {
          mergedList.push({...city, maxWeight})
          tempIndex[city.id] = mergedList.length - 1
        }
      }
    }

    // calcul matching
    const mergedLength = mergedList.length
    for(let x = 0; x < mergedLength; x++) {
      mergedList[x].match = mergedList[x].weight * 100 / maxWeight
    }

    // order results
    Model.cacheSearchCities[JSON.stringify({codeRegion, codeCriterion, codeRome})] = mergedList.map(c => ({...c, city_size_label: citySizeLabel(c) }))
    return Model.cacheSearchCities[JSON.stringify({codeRegion, codeCriterion, codeRome})]
  }

  Model.getCity = async ({insee}) => {
    const city = await Model.findOne({where: {insee_com: insee},
      include: [{
        model: Model.models.regions,
        require: true,
      }],
      raw: true})

    if(city) {
      city.nom_comm = (city.nom_comm || '').replace(/--/gi, '-').replace(/-1er-arrondissement/gi, '')
    }

    return city
  }

  Model.checkAndStartSyncCity = () => {
    if(!Model.cityOnSync) {
      Model.syncOneCity()
    }
  }

  Model.syncOneCity = async () => {
    Model.cityOnSync = true

    const city = await Model.findOne({
      where: {[Op.or]: [
        {distance_from_sea: null}, 
        {average_temperature: null},
        {description: null},
        {average_houseselled: null},
        {city_house_tension: null},
        {average_houserent: null},
      ],
      },
      order: [['population', 'DESC']],
      logging: false,
    })

    if(city) {
      const options = {}
      let isHttpLoad = false
      console.log(`[START] Sync city ${city.dataValues.id} - ${city.dataValues.nom_comm}`)
      if(city.dataValues.distance_from_sea === null) {
        options.distance_from_sea = Model.distanceFromSea(city.dataValues.geo_point_2d_x, city.dataValues.geo_point_2d_y)
      }

      if(city.dataValues.average_temperature === null) {
        isHttpLoad = true
        options.average_temperature = await Model.averageTemperature(city.dataValues.geo_point_2d_x, city.dataValues.geo_point_2d_y)
      }

      if(city.dataValues.description === null) {
        isHttpLoad = true
        const {photo, description} = await Model.getDescription(city.nom_comm)
        options.photo = photo
        options.description = description
      }

      if(city.dataValues.average_houseselled === null) {
        options.average_houseselled = await Model.getAveragePricing(city.insee_com)
      }

      if(city.dataValues.city_house_tension === null) {
        options.city_house_tension = await Model.getCityHouseTension(city.insee_com)
      }

      if(city.dataValues.average_houserent === null) {
        options.average_houserent = await Model.getAverageHouseRent(city.insee_com)
      }      

      await city.update(options)
      console.log(`[DONE] Sync city ${city.id}`, options)
      
      if(isHttpLoad) {
        await sleep(700) // wait and restart command
      }
      Model.syncOneCity()
    } else {
      Model.cityOnSync = false
    }
  }

  Model.distanceFromSea = (lat, long) => {
    if(!Model.franceShape) {
      Model.franceShape = getFranceShape()
    }
    let minDistance = null
    Model.franceShape.map(coordinate => {
      let dist = distanceBetweenToCoordinates(coordinate[1], coordinate[0], lat, long, 'K')
      if(dist < 0) {
        dist *= -1
      }

      if(dist < minDistance || !minDistance)  {
        minDistance = dist
      }
    })

    return minDistance
  }

  Model.averageTemperature = async (lat, long) => {
    if(!Model.weatherStationList) {
      Model.weatherStationList = await getFrenchWeatherStation()
    }

    let minDistance = null
    let stationId = null
    let stationIndex = null
    Model.weatherStationList.map((station, index) => {
      let dist = distanceBetweenToCoordinates(+station.latitude.replace(',', '.'), +station.longitude.replace(',', '.'), lat, long, 'K')
      if(dist < 0) {
        dist *= -1
      }

      if(dist < minDistance || !minDistance)  {
        minDistance = dist
        stationId = station.numero
        stationIndex = index
      }
    })

    // cache http and calcul
    if(Model.averageTemperatureCache[stationId]) {
      return Model.averageTemperatureCache[stationId]
    }

    try {
      console.log(`load station file => id: ${stationId}`)
      const file = await loadWeatherFile(stationId)
      const findLineIndex = file.findIndex(l => l.indexOf('Température moyenne') !== -1)
      let temperatureLine = file[findLineIndex + 1]
      if(temperatureLine.indexOf('Statistiques') !== -1) {
        // escape information line
        temperatureLine = file[findLineIndex + 2]
      }

      const allTemps = []
      temperatureLine.replace(/(\r\n|\n|\r)/gm, '').split(';').map(temp => {
        if(+temp) {
          allTemps.push(+temp)
        }
      })
      const meanCalc = mean(allTemps)
      Model.averageTemperatureCache[stationId] = meanCalc
      if((meanCalc || null) === null) {
        throw 'File not found'
      } else {
        return meanCalc
      }
    } catch(err) {
      // if file is broken or not exist
      Model.weatherStationList.splice(stationIndex, 1)
      return await Model.averageTemperature(lat, long)
    }
  }

  Model.getDescription = async(cityName) => {
    const cityDetails = await wikipediaDetails(cityName)
    let description = NO_DESCRIPTION_MSG
    let photo = null

    if(cityDetails && cityDetails.extract) {
      description = (cityDetails.extract || '').replace(/\((.*?)\)/gim, '').replace(/\[(.*?)\]/gim, '')
    }

    if(cityDetails && cityDetails.original && cityDetails.original.source) {
      photo = cityDetails.original.source
    }
    
    return {
      description,
      photo,
    }
  }

  Model.searchByLocation = async ({latitude, longitude})  => {
    const cities = await Model.findAll({
      where: {[Op.and]: [
        {geo_point_2d_x: {[Op.lt]: latitude + 0.5}},
        {geo_point_2d_x: {[Op.gt]: latitude - 0.5}},
        {geo_point_2d_y: {[Op.lt]: longitude + 0.5}},
        {geo_point_2d_y: {[Op.gt]: longitude - 0.5}},
      ]},
      raw: true,
    })

    let minDistance = null
    let city = null
    cities.map(c => {
      let dist = distanceBetweenToCoordinates(c.geo_point_2d_x, c.geo_point_2d_y, latitude, longitude, 'K')
      if(dist < 0) {
        dist *= -1
      }

      if(dist < minDistance || !minDistance)  {
        minDistance = dist
        city = c
      }
    })

    return city
  }  

  Model.searchById = async ({id})  => {
    const cities = await Model.findAll({
      where: {id: +id},
      limit: 1,
      raw: true,
    })

    return cities
  }

  Model.searchByName = async ({name})  => {
    const cities = await Model.findAll({
      where: {
        [Op.and]: [{
          [Op.or]: [
            {nom_comm: {[Op.like]: `${name}%`}},
            {nom_comm: name},
            {postal_code: {[Op.like]: `${name}%`}},
          ]}, 
        [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
          .map(v => ({nom_comm: {[Op.notLike]: `%-${v}%-arrondissement%`}})),
        ],
      },
      order: [['nom_comm', 'ASC']],
      limit: 10,
      raw: true,
    })

    return cities.map(c => ({...c, nom_comm: (c.nom_comm || '').replace(/--/gi, '-').replace(/-1er-arrondissement/gi, '')}))
  }  

  Model.getAveragePricing = async(cityInsee) => {
    let allIntoFile = Model.cacheLoadAveragePricing
    if(!allIntoFile) {
      allIntoFile = await getAveragePricing()
      Model.cacheLoadAveragePricing = allIntoFile
    }

    const find = allIntoFile.find(c => c.insee_com === cityInsee)
    if(find && Number(find.prixmoyen_m2)) {
      return find.prixmoyen_m2
    }

    return 0
  }

  Model.getCityHouseTension = async(cityInsee) => {
    let allIntoFile = Model.cacheLoadAverageHouseTension
    if(!allIntoFile) {
      allIntoFile = await getTensionsCities()
      Model.cacheLoadAverageHouseTension = allIntoFile
    }

    const find = allIntoFile.find(c => c.codeInsee === cityInsee)
    if(find) {
      return find.frais
    }

    return 0
  }

  Model.getAverageHouseRent = async(cityInsee) => {
    let allIntoFile = Model.cacheLoadAverageHouseRent
    if(!allIntoFile) {
      allIntoFile = await getAverageHouseRent()
      Model.cacheLoadAverageHouseRent = allIntoFile
    }

    const find = allIntoFile.find(c => c.insee === (+cityInsee) + '')
    if(find && find.loypredm2) {
      return parseFloat(find.loypredm2.replace(/,/g, '.'))
    }

    return 0
  }

  Model.getCacheLivingEnvironment = async(insee) => {
    const list = [...ALL_LIFE_CRITERIONS_LIST]
    const all = {}

    for(let i = 0; i < list.length; i++) {
      for(let x = 0; x < list[i].tab.length; x++) {
        const total = (await Model.models.amenities.getTotal(insee, list[i].tab[x].code))
        if(total) {
          all[list[i].key + '-' + list[i].tab[x].label] = total
        }
      }
    }

    return all
  }
  
  return Model
}
