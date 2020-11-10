export default (sequelizeInstance, Model) => {
  Model.syncCities = async ({cities}) => {
    let nbUpdated = 0
    let nbInserted = 0
    for(let i = 0; i < cities.length; i++) {
      const city = cities[i]
      const findedCity = await Model.findOne({where: {code_comm: city.code_commune}, raw: true})

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

      if(findedCity) {
        nbUpdated ++
        await Model.update(jsonToUpdate, {where: {id: findedCity.id}})
      } else {
        nbInserted ++
        await Model.create(jsonToUpdate)
      }
    }

    return {
      'nb read': cities.length,
      'nb updated': nbUpdated,
      'nb inserted': nbInserted,
    }
  }
  
  return Model
}
