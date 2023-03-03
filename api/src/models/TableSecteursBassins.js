export default (sequelizeInstance, Model) => {
  Model.sync = async ({ secteursBassins }) => {
    await Model.destroy({ truncate: true })
    await Model.bulkCreate(secteursBassins)
  }

  return Model
}
