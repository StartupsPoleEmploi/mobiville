import { Op } from 'sequelize'
import { orderBy } from 'lodash'
import { ALT_IS_MOUNTAIN, CRIT_LARGE_CITY, CRIT_MEDIUM_CITY, CRIT_MOUNTAIN, CRIT_SMALL_CITY, IS_LARGE_CITY, IS_SMALL_CITY } from '../constants/criterion'

export default (sequelizeInstance, Model) => {
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

  Model.search = async ({code_region = [], code_criterion = []}) => {
    const list = []

    // criterions
    for(let i = 0; i < code_criterion.length; i++) {
      const crit = code_criterion[i]

      switch(crit) {
      case CRIT_MOUNTAIN:
        list.push((await Model.findAll({
          where: {
            z_moyen : {[Op.gte]: ALT_IS_MOUNTAIN},
          },
          raw: true,
        })).map(c => ({...c, tags: [crit]})))
        break
      case CRIT_SMALL_CITY:
        list.push((await Model.findAll({
          where: {
            population : {[Op.lte]: IS_SMALL_CITY},
          },
          raw: true,
        })).map(c => ({...c, tags: [crit]})))
        break
      case CRIT_MEDIUM_CITY:
        list.push((await Model.findAll({
          where: {
            [Op.and]: [{
              population : {[Op.gt]: IS_SMALL_CITY},
            }, {
              population : {[Op.lt]: IS_LARGE_CITY},
            }]},
          raw: true,
        })).map(c => ({...c, tags: [crit]})))
        break
      case CRIT_LARGE_CITY:
        list.push((await Model.findAll({
          where: {
            population : {[Op.gte]: IS_LARGE_CITY},
          },
          raw: true,
        })).map(c => ({...c, tags: [crit]})))
        break
      }
    }

    // all regions
    for(let i = 0; i < code_region.length; i++) {
      const reg = code_region[i]

      list.push((await Model.findAll({
        where: {
          code_reg : reg,
        },
        raw: true,
      })).map(c => ({...c, tags: ['reg_' + reg]})))
    }



    // merge lists
    const mergedList = []
    const totalTags = code_criterion.length + code_region.length
    list.map(typeOfList => {
      typeOfList.map(city => {
        const findIndex = mergedList.findIndex(c => c.id === city.id)
        if(findIndex !== -1) {
          mergedList[findIndex].tags = mergedList[findIndex].tags.concat(city.tags)
          mergedList[findIndex].match = mergedList[findIndex].tags.length * 100 / totalTags
        } else {
          mergedList.push({...city, match: city.tags.length * 100 / totalTags})
        }
      })
    })

    return orderBy(mergedList, ['match'], ['desc'])
  }
  
  return Model
}
