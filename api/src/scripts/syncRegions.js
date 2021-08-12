// A script to execute all syncs that were previously done in the sync route
import { getAllRegions, getRegionsSocialHousing } from '../utils/api'

import db from '../models'

const models = db.initModels()

const doSync = async () => {
  try {
    const regions = await getAllRegions()
    const socialHousingData = getRegionsSocialHousing()
    const status = await models.regions.syncRegions({
      regions,
      socialHousingData,
    })
    console.log('Success! Status:', status)
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log(
  'Starting synchronization for cities. This should be almost instanteneous. Please wait for the confirmation message…'
)
doSync()
