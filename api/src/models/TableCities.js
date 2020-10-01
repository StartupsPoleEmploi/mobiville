export default (sequelizeInstance, Model) => {
  Model.syncCities = async ({cities}) => {
    for(let i = 0; i < cities.length; i++) {
      const city = cities[i]
      const findedCity = await Model.findOne({where: {code_comm: city.code_comm}, raw: true})

      const jsonToUpdate = {
        code_comm: city.code_comm,
        nom_dept: city.nom_dept,
        statut: city.statut,
        z_moyen: city.z_moyen,
        nom_region: city.nom_region,
        code_reg: city.code_reg,
        insee_com: city.insee_com,
        code_dept: city.code_dept,
        geo_point_2d_x: city.geo_point_2d ? city.geo_point_2d[0] : null,
        geo_point_2d_y: city.geo_point_2d ? city.geo_point_2d[1] : null,
        postal_code: city.postal_code,
        id_geofla: city.id_geofla,
        code_cant: city.code_cant,
        superficie: city.superficie,
        nom_comm: city.nom_comm,
        code_arr: city.code_arr,
        population: city.population,
      }

      if(findedCity) {
        await Model.update(jsonToUpdate, {where: {id: findedCity.id}})
      } else {
        await Model.create(jsonToUpdate)
      }
    }
  }
  
  return Model
}
