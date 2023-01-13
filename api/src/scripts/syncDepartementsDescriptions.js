import db from '../models'
import { getAllDepartements } from '../utils/api'

const models = db.initModels()

const doSync = async () => {
  try {
    const departements = await getAllDepartements()

    for (const dept of departements) {
      await models.departements.syncDepartementData(dept)
    }

    console.log('Success!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log(
  'Starting synchronization for departements descriptions.'
)
doSync()
