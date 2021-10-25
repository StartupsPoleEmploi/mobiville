import db from '../models'
import helps from '../assets/datas/helps.json'

const models = db.initModels()

const doSync = async () => {
  try {
    const status = await models.helps.sync(helps)
    console.log('Success! Status:', status)
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log('Starting synchronization for helps. This should be instantaneous.')
doSync()
