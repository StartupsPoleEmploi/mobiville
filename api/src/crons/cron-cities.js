var CronJob = require('cron').CronJob

const citiesCron = (env) => {
  var syncOneCity = new CronJob('* * * * * *', function() {
    env.models.cities.syncOneCity()
  }, null, true)

  console.log('START CRONS : CITIES')
  syncOneCity.start()
}

export default citiesCron