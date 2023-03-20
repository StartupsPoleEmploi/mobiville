// A script to execute all syncs that were previously done in the sync route
import { getAllRegions } from '../utils/api'

import db from '../models'

const models = db.initModels()

const doSync = async () => {
  try {
    const regions = await getAllRegions()
    
    await models.regions.syncRegions({ regions })

    console.log('Success!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log(
  'Starting synchronization for regions. This should be almost instanteneous. Please wait for the confirmation message…'
)
doSync()
