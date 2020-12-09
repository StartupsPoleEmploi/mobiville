export default (sequelizeInstance, Model) => {
  Model.addStats = async ({values = {}, session_id = null}) => {
    Object.entries(values).forEach(([type, values]) => {
      values.map(v => {
        Model.create({value_memo: v, type, session_id})
      })
    })
  }
  
  
  return Model
}
