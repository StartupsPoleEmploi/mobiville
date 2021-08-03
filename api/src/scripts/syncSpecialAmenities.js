import db from '../models'

const models = db.initModels()

const doSync = async () => {
  try {
    await models.amenities.syncSpecialCities()
    console.log('Success!')

    process.exit(0)

  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log(`
Starting synchronization for amenities in Paris, Lyon, Marseille.
This will fail if the base amenities script hasn't populated the db yet
`)
doSync()
