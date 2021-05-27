import cities from './cron-cities'
import regionTensionsCron from './cron-regionsTensions'

export const start = (env) => {
  cities(env)
  regionTensionsCron(env)
}