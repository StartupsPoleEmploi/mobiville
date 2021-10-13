import cities from './cron-cities'
import bassinsJobsCron from './cron-bassinsJobs'

export const start = (env) => {
  cities(env)
  bassinsJobsCron(env)
}
