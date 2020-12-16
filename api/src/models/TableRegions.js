export default (sequelizeInstance, Model) => {
  Model.syncRegions = async ({regions}) => {
    await Model.deleteAll()

    for(let i = 0; i < regions.length; i++) {
      const region = regions[i]

      await Model.create(region)
    }

    return {
      'nb read': regions.length,
    }
  }

  Model.getCodeRegOfOldRegion = async (new_code) => {
    const list = await Model.findAll({
      where: {
        new_code,
      },
      group: ['former_code'],
      raw: true,  
    })

    return list.map(r => (r.former_code))
  }
  
  
  return Model
}
