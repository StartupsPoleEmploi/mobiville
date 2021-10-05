import cities from './cron-cities'
import regionTensionsCron from './cron-regionsTensions'
import bassinsJobsCron from './cron-bassinsJobs'

export const start = (env) => {
  cities(env)
  regionTensionsCron(env)
  bassinsJobsCron(env)
}
