import db from '../models'
import { getDepartementTemperatures } from '../utils/api'

const models = db.initModels()

const doSync = async () => {
  try {
    const temperatures = await getDepartementTemperatures()

    const currentYear = new Date().getFullYear()
    const WINTER = 0 // 22 décembre - 19 mars
    const SPRING = 1 // 20 mars - 21 juin
    const SUMMER = 2 // 22 juin - 23 septembre
    const AUTUMN = 3 // 24 septembre - 21 décembre

    const seasonsDate = [
      new Date('2023-03-20'),
      new Date('2023-06-22'),
      new Date('2023-09-24'),
      new Date('2023-12-21'),
    ]
    seasonsDate.forEach((seasonDate) => seasonDate.setFullYear(currentYear))

    const formattedTemperatures = temperatures
      .map(({ date_obs, code_insee_departement, tmoy }) => ({
        date_obs,
        code_insee_departement,
        temperature: tmoy,
      }))
      .map(({ date_obs, code_insee_departement, temperature }) => {
        const date = new Date(date_obs)
        date.setFullYear(currentYear)

        let seasonIndex = seasonsDate.indexOf(
          seasonsDate.find((seasonsDate) => date < seasonsDate)
        )
        seasonIndex = seasonIndex === -1 ? WINTER : seasonIndex

        return {
          season: seasonIndex,
          code_insee_departement,
          temperature,
        }
      })
      .reduce((groups, item) => {
        const code = item.code_insee_departement
        groups[code] = groups[code] || []
        groups[code].push(item)
        return groups
      }, {})

    const result = Object.values(formattedTemperatures).map(
      (departementData) => {
        const seasonNumber = [
          departementData.filter((data) => +data.season === WINTER).length,
          departementData.filter((data) => +data.season === SPRING).length,
          departementData.filter((data) => +data.season === SUMMER).length,
          departementData.filter((data) => +data.season === AUTUMN).length,
        ]

        const averagTemperatureBySeason = departementData
          .reduce(
            (prev, curr) => {
              prev[+curr.season] += +curr.temperature
              return prev
            },
            [0.0, 0.0, 0.0, 0.0]
          )
          .map((seasonSum, index) => seasonSum / seasonNumber[index])

        return {
          code: departementData[0].code_insee_departement,
          temp_winter: averagTemperatureBySeason[WINTER],
          temp_spring: averagTemperatureBySeason[SPRING],
          temp_summer: averagTemperatureBySeason[SUMMER],
          temp_autumn: averagTemperatureBySeason[AUTUMN],
        }
      }
    )

    for (const dept of result) {
      await models.departements.syncDepartementTemperatures(dept)
    }

    console.log(result)

    console.log('Success!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    console.error('Error! Sync failed and will now exit')
    process.exit(1)
  }
}

console.log('Starting synchronization for departements temperatures.')
doSync()
