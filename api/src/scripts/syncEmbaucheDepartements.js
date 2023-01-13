import { syncEmbaucheDepartements } from '../crons/cron-departementJobs'
import db from '../models'

const models = db.initModels()

const doSync = async () => {
  try {
    await syncEmbaucheDepartements(models, true)

    console.log('Success!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log(
  'Début de sync pour la table embauche des departements.'
)
doSync()
