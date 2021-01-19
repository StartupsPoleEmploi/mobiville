import { Op } from 'sequelize'
import { mean, sortBy } from 'lodash'
import { ALT_IS_MOUNTAIN, CRITERIONS, CRIT_CAMPAGNE, CRIT_EXTRA_LARGE_CITY, CRIT_MOUNTAIN, CRIT_SIDE_SEA, CRIT_SMALL_CITY, CRIT_SUN, IS_LARGE_CITY, IS_SMALL_CITY, IS_SUNNY, SIDE_SEA, WEIGHT_REGION } from '../constants/criterion'
import { getFranceShape, getFrenchWeatherStation, loadWeatherFile, wikipediaDetails, wikipediaSearchCity } from '../utils/api'
import { citySizeLabel, distanceBetweenToCoordinates, sleep } from '../utils/utils'
import { NO_DESCRIPTION_MSG } from '../constants/messages'

export default (sequelizeInstance, Model) => {
  Model.franceShape = null
  Model.weatherStationList = null
  Model.averageTemperatureCache = {}
  Model.cityOnSync = false
  Model.cacheSearchCities = {}

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
    const list = await Model.models.regions.findAll({
      group: ['new_code'],
      raw: true,
    })

    return sortBy(list.map(r => ({id: r.new_code, label: r.new_name})), ['label'])
  }

  Model.allTensionsCities = async ({where, codeRome}) => {
    return await Model.findAll({
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
        case CRIT_SMALL_CITY: // exclusion list
          l = (await Model.allTensionsCities({
            where: {
              population : {[Op.gte]: IS_SMALL_CITY},
            },
            codeRome,
          }))
          break
        case CRIT_EXTRA_LARGE_CITY: // exclusion list
          l = (await Model.allTensionsCities({
            where: {
              population : {[Op.lte]: IS_LARGE_CITY},
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
    const city = await Model.findOne({where: {insee_com: insee}, raw: true})

    if(city) {
      // OTHER TASK


      return city
    }

    return null
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
      ],
      },
      order: [['population', 'DESC']],
      logging: false,
    })

    if(city) {
      const options = {}
      console.log(`[START] Sync city ${city.dataValues.id} - ${city.dataValues.nom_comm}`)
      if(city.dataValues.distance_from_sea === null) {
        options.distance_from_sea = Model.distanceFromSea(city.dataValues.geo_point_2d_x, city.dataValues.geo_point_2d_y)
      }

      if(city.dataValues.average_temperature === null) {
        options.average_temperature = await Model.averageTemperature(city.dataValues.geo_point_2d_x, city.dataValues.geo_point_2d_y)
      }

      if(city.dataValues.description === null) {
        options.description = await Model.getDescription(city.nom_comm)
      }

      await city.update(options)
      console.log(`[DONE] Sync city ${city.id}`, options)
      
      await sleep(1000) // wait and restart command
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
    const listCity = await wikipediaSearchCity(cityName)
    const firstItem = listCity.length ? listCity[0] : null
    
    if(firstItem && firstItem.title) {
      try {
        const description = await wikipediaDetails(firstItem.title)
        if(description) {
          return description
        }
      } catch(err) {
        console.log(err)
      }
    }

    return NO_DESCRIPTION_MSG
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
      where: {[Op.or]: [
        {nom_comm: {[Op.like]: `%${name}%`}},
        {postal_code: {[Op.like]: `%${name}%`}},
      ]},
      limit: 5,
      raw: true,
    })

    return cities
  }  
  
  return Model
}
