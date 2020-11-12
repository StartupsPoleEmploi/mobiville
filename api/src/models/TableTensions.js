export default (sequelizeInstance, Model) => {
  Model.syncTensions = async ({tensions}) => {
    await Model.deleteAll()

    let nbInserted = 0
    for(let i = 0; i < tensions.length; i++) {
      const tension = tensions[i]
      nbInserted ++
      await Model.create(tension)
    }

    return {
      'nb read': tensions.length,
      'nb inserted': nbInserted,
    }
  }
  
  return Model
}
