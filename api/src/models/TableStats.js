import { Op } from 'sequelize'
import {CODE_ROMES, CRITERIONS} from '../constants/criterion'

export default (sequelizeInstance, Model) => {
  Model.addStats = async ({values = {}, session_id = null}) => {
    Object.entries(values).forEach(([type, values]) => {
      values.map(v => {
        Model.create({value_memo: v, type, session_id})
      })
    })
  }

  Model.getSearchs = async () => {
    const regions = await Model.models.cities.regions()
    const regionsObjects = {}
    regions.map(r => {
      regionsObjects[r.id] = r.label
    })

    const romeObjects = {}
    CODE_ROMES.map(r => {
      romeObjects[r.key] = r.label
    })

    const criterionsObjects = {}
    CRITERIONS.map(r => {
      criterionsObjects[r.key] = r.label
    })

    

    return (await Model.findAll({
      attributes: ['value_memo', 'session_id', 'type', 'created_at'],
      where: {
        type: {[Op.ne]: null},
      },
      raw: true,
    })).map(stat => {
      var label
      switch(stat.type) {
      case 'codeRegion':
        label = regionsObjects[stat.value_memo]
        break
      case 'codeRome':
        label = romeObjects[stat.value_memo]
        break
      case 'codeCriterion':
        label = criterionsObjects[stat.value_memo]
        break
      }

      if(label) {
        stat.label = label
      }

      return stat
    }).filter(s => s.label)
  }
  
  
  return Model
}
