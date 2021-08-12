import { CronJob } from 'cron'

const regionTensionsCron = async (env) => {
  console.log('START CRONS : REGIONS TENSIONS')

  // check day at midnight
  new CronJob('0 0 * * * *', async function () {
    await env.models.regionsTensions.sync()
  })

  await env.models.regionsTensions.sync()
}

export default regionTensionsCron
