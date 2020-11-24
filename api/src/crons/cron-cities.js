var CronJob = require('cron').CronJob
import config from 'config'

const citiesCron = (env) => {
  var syncOneCity = new CronJob('* * * * * *', async function() {
    for(let i = 0; i < config.nb_sync_cities_same_time; i++) {
      await env.models.cities.syncOneCity()
    }
  }, null, true)

  console.log('START CRONS : CITIES')
  syncOneCity.start()
}

export default citiesCron