import cities from './cron-cities'
import citiesJobsCron from './cron-citiesJobs'
import departementCron from './cron-departementJobs'

export const start = (models) => {
  cities(models)
  citiesJobsCron(models)
  departementCron(models)
}
