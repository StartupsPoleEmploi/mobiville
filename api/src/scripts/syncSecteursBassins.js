import db from '../models'
import { getAllSecteursBassins } from '../utils/api'

const models = db.initModels()

const doSync = async () => {
  try {
    let secteursBassins = await getAllSecteursBassins()
    secteursBassins = secteursBassins.filter(secteur => !!secteur.code_bassin)
    await models.secteursBassins.sync({ secteursBassins })

    console.log('Success!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log(
  'Starting synchronization for secteurs bassins. This should be almost instanteneous. Please wait for the confirmation message…'
)
doSync()