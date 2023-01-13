import { CronJob } from 'cron'
import { getEmbaucheByDepartement } from '../utils/smart-emploi-api'
import { sleep } from '../utils/utils'
import moment from 'moment'

const departementCron = async (models) => {
  var NODE_ENV = process.env.NODE_ENV
  if (NODE_ENV !== 'development') {
    console.log('START CRONS : DepartementJobs')

    // tous les 3 mois a 20h00
    const syncEmbauche = new CronJob('0 20 15 */3 *', async function () {
      syncEmbaucheDepartements(models, false)
    })

    syncEmbauche.start()
  } else {
    console.log('NOT STARTED CRONS : DepartementJobs ==> DEV MODE ON')
  }
}

// import db from '../models'
// const models = db.initModels()
// models.departements.getDepartement({ code: '67' }).then((d) => {
//   models.departements.syncDepartementData(d)
// })

export const syncEmbaucheDepartements = async (models, isForce) => {
  const departements = await models.departements.getAllDepartement()
  const romes = await models.romeskills.getAllCodeRome()

  for (const dept of departements) {
    console.log(`Synchro stats d'embauche pour le departement ${dept.code}`)
    for (const rome of romes) {
      await sleep(400)
      if (!isForce) {
        await waitLowTrafficTime()
      }
      getEmbaucheByDepartement(dept.code, rome.codeRome).then(
        (statEmbauche) => {
          models.embaucheDepartements.updateEmbauche(statEmbauche)
        }
      )
    }
  }
}

const waitLowTrafficTime = async () => {
  // const now = moment('2023-01-06T21:01:00.000Z', 'YYYY-MM-DDThh:mm:ss.zzzZ')
  const now = moment()
  const isWeekend = [6, 7].includes(now.weekday())
  // le serveur est en UTC
  const isAtNight = !now.isBetween(
    moment('08:30', 'hh:mm'),
    moment('21:00', 'hh:mm')
  )

  if (!isWeekend && !isAtNight) {
    let restartTime = now.clone().hour(21).minute(0).seconds(0)
    const waitTimeMs = restartTime - moment()
    console.log(
      `synchro des embauches par departement en pause ${
        waitTimeMs / 1000
      } secondes `
    )
    await sleep(waitTimeMs)
  }
  // console.log(moment().hour())
}

export default departementCron
