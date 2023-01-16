import cities from './cron-cities'
import departementCron from './cron-departementJobs'

export const start = (models) => {
  cities(models)
  departementCron(models)
}
