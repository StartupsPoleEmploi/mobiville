import db from '../models'

const models = db.initModels()

const doSync = async () => {
  try {
    await models.romeogrs.syncRomeOgrs()
    console.log('Success!')

    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

doSync()
