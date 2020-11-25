import cities from './cron-cities'

export const start = (env) => {
  cities(env)
}