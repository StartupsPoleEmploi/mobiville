import { CronJob } from 'cron'
import { doSync as doSyncSecteursBassins } from '../scripts/syncSecteursBassins';

const secteursBassinsCron = async () => {

  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV !== 'development') {
    console.log('START CRONS : SECTEURS BASSINS')

    // At 00:00 on day-of-month 2 in January, April, July, and October.
    const syncSecteursBassins = new CronJob('0 0 2 1,4,7,10 *', async function () {
      doSyncSecteursBassins()
    })

    syncSecteursBassins.start()
  } else {
    console.log('NOT STARTED CRON : SECTEURS BASSINS ==> DEV MODE ON')
  }

}

export default secteursBassinsCron
