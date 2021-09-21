// A script to execute all syncs that were previously done in the sync route
import { getEquipmentsDatas } from '../utils/api'
import db from '../models'

const models = db.initModels()

const doSync = async () => {
  try {
    const equipments = await getEquipmentsDatas()
    const status = await models.equipments.sync({ equipments })
    console.log('Success! Status:', status)
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log(
  'Starting synchronization for equipments. This will take some time, please do not exit.'
)
doSync()
