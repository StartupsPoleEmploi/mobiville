import { groupBy, sortBy, toArray } from 'lodash'
import { CRITERIONS } from '../constants/criterion'

export default (sequelizeInstance, Model) => {
  let loading = true

  // populate regions_tensions data from cities data. Quite lengthy (~25s with 77 jobs), so should be run
  // from another process, at specific times.
  Model.sync = async () => {
    await Model.truncate({ force: true })

    const tableData = await Model.findAll()

    const jobList = await Model.models.tensions.fetchJobList()

    for (const criterion of CRITERIONS) {
      const romesByRegion = {}

      for (const job of jobList) {
        const { rome } = job
        const citiesGroupedByRegion = groupBy(
          (await Model.models.cities.search({ codeCriterion: [criterion.key], codeRome: [rome], logging: false })),
          'region.new_code'
        )

        Object.keys(citiesGroupedByRegion).forEach(regionCode => {
          if (!romesByRegion[regionCode]) {
            romesByRegion[regionCode] = []
          }

          if (romesByRegion[regionCode].includes(rome)) return

          romesByRegion[regionCode].push(rome)
        })
      }


      for (const regionCode of Object.keys(romesByRegion)) {
        const romes = romesByRegion[regionCode]

        for (const rome of romes) {
          const hasDataInTable = tableData.find(row => {
            return row.region_new_code === regionCode && row.rome === rome && row.criterion === criterion.key
          })

          if (hasDataInTable) continue

          await Model.create({
            rome,
            region_new_code: regionCode,
            criterion: criterion.key,
          })
        }
      }
    }

    loading = false
  }

  Model.fetch = async () => {
    if (loading) throw new Error('Loading error, please try again in a few seconds') // initial loading only

    if (Model.cache) {
      return Model.cache
    }

    const queryResult = await Model.findAll({
      include: [
        {
          attributes: ['new_name'],
          model: Model.models.regions,
          required: true,
        },
      ],
    })

    let objectByRegions = {}

    queryResult.forEach(row => {
      const regionName = row.region.new_name

      if (!objectByRegions[row.region_new_code]) {
        objectByRegions[row.region_new_code] = {
          id: row.region_new_code,
          label: regionName,
          criterions: {
            [row.rome]: [row.criterion],
          },
        }
        return
      }

      if (!objectByRegions[row.region_new_code].criterions[row.rome]) {
        objectByRegions[row.region_new_code].criterions[row.rome] = [row.criterion]
        return
      }

      if (objectByRegions[row.region_new_code].criterions[row.rome].includes(row.criterion)) return

      objectByRegions[row.region_new_code].criterions[row.rome].push(row.criterion)
    })

    Model.cache = sortBy(toArray(objectByRegions), 'label')
    return Model.cache
  }


  return Model
}
