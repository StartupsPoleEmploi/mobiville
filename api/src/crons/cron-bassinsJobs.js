import { CronJob } from 'cron'
import { getBassinJobsCount } from '../utils/api'

const citiesCron = async (env) => {
  console.log('START CRONS : bassinsJobs')

  const loadAndSync = async () =>
    getBassinJobsCount().then((data) => env.models.bassinsJobs.sync(data))

  // check day at midnight
  const cronJob = new CronJob('0 0 * * * *', loadAndSync)

  await loadAndSync()
  cronJob.start()
}

export default citiesCron
