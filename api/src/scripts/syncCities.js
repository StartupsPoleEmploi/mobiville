// A script to execute all syncs that were previously done in the sync route
import { getAllCities } from '../utils/api'

import db from '../models'

const models = db.initModels()

const doSync = async () => {
  try {
    const cities = await getAllCities()
    const status = await models.cities.syncCities({ cities })
    console.log('Success! Status:', status)
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log(
  'Starting synchronization for cities. This should take about 2 minutes. Please wait for the confirmation message…'
)
doSync()
