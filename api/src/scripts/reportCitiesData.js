import fs from 'fs'
import { stringify } from 'csv-stringify'

import db from '../models'
import { searchJobCount, searchCloseCompanies } from '../utils/pe-api'
import { getInseeCodeUniqueForSearch, getTotalOffres } from '../utils/utils'
import { sleep } from '../utils/utils'

const models = db.initModels()

export const reportCitiesData = async () => {
  const date = new Date()
  const formattedDate = `${date.getFullYear()}${((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1)}${(date.getDate() < 10 ? '0' : '') + date.getDate()}`

  const writableStream = fs.createWriteStream(
    __dirname + `/../assets/datas/reports/cities_data-${formattedDate}.csv`
  )
  const stringifier = stringify({
    header: true,
    columns: ['city_insee', 'job_count', 'companies_count', 'equipments_count'],
  })
  stringifier.pipe(writableStream)

  try {
    const cities = await models.cities.getCities()
    const codeRomes = await models.tensions.fetchJobList()
      .then((jobList) => jobList.map((job) => job.rome))

    for (let city of cities) {
      const insee = getInseeCodeUniqueForSearch(city.insee_com)
      Promise.all([
        searchJobCount({
          insee: [insee],
          distance: 10,
        }),
        searchCloseCompanies({
          codeRome: codeRomes,
          insee: insee,
          distance: 10,
          page: 1,
          pageSize: 1
        }).then(res => res.companies_count),
        models.equipments.getEquipments({ insee: insee })
          .then(res => res.reduce((prev, curr) => prev += curr.total, 0))
      ]).then(([jobCount, closeCompaniesCount, equipmentsCount]) => {
        stringifier.write([
          insee,
          getTotalOffres(jobCount),
          closeCompaniesCount,
          equipmentsCount
        ])
      })

      await sleep(500)
    }

    stringifier.end()

    console.log('Finished writing data')
    console.log('Success!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Report missing data failed and will now exit')
    process.exit(1)
  }
}

console.log(
  'Starting generating report missing data. Please wait for the confirmation message…'
)

reportCitiesData()
