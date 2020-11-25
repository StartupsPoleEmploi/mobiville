import { CronJob } from 'cron'

const citiesCron = async (env) => {
  console.log('START CRONS : CITIES')

  // check day at midnight
  const syncOneCity = new CronJob('0 0 * * * *', async function() {
    await env.models.cities.checkAndStartSyncCity()
  })


  await env.models.cities.checkAndStartSyncCity()
  syncOneCity.start()
}

export default citiesCron