import { groupBy, uniq, sortBy, toArray } from 'lodash'
import { CRITERIONS } from '../constants/criterion'
import { DOMTOM_ID as DOMTOM_CODE, DOMTOM } from '../constants/domTom'

export default (sequelizeInstance, Model) => {
  // crude implementation of what was previously done at app startup, with an intermediate table.
  // Basically creates a JSON object with criterions info per region and stores it in db.
  // (The code is probably super-optimizable as it’s basically a concatenation of what was done in 2 times)
  Model.sync = async () => {
    console.log('START SYNC REGIONS TENSIONS CRITERIONS')

    const jobList = await Model.models.tensions.fetchJobList()
    const regionsList = await Model.models.regions.findAll()
    const opportuniteMap = await Model.models.tensions.getTauxdOpportunite()

    const regionsTensionsTemp = []

    for (const criterion of CRITERIONS) {
      const romesByRegion = {}

      for (const job of jobList) {
        const { rome } = job
        const [searchResult] = await Model.models.cities.search({
          codeCriterion: [criterion.key],
          codeRome: [rome],
          logging: false,
        })

        const citiesGroupedByRegion = groupBy(searchResult, 'code_region')

        Object.keys(citiesGroupedByRegion).forEach((regionCode) => {
          if (!romesByRegion[regionCode]) {
            romesByRegion[regionCode] = []
          }

          if (romesByRegion[regionCode].includes(rome)) return

          romesByRegion[regionCode].push(rome)
        })
      }

      for (const regionCode of Object.keys(romesByRegion)) {
        // mayotte n'a pas de métier en tension ?
        const romes = [...romesByRegion[regionCode]]

        let region = regionsList.find((region) => region.code == regionCode)
        if (DOMTOM_CODE.includes(regionCode)) {
          // FIXME: Cas des DOM avec regions uni-départemental
          region = DOMTOM.find((region) => region.code == regionCode)
        }

        for (const rome of romes) {
          const opportuniteByKey = opportuniteMap.find(
            (v) => v.code_rome === rome && `${v.code_region}` === regionCode
          )
          regionsTensionsTemp.push({
            rome,
            region_new_code: regionCode,
            region_new_name: region.name,
            criterion: criterion.key,
            opportunite: opportuniteByKey
              ? opportuniteByKey.opportunite
              : undefined,
          })
        }
      }
    }

    const regionsTensions = uniq(regionsTensionsTemp)

    let objectByRegions = {}

    regionsTensions.forEach((row) => {
      if (!objectByRegions[row.region_new_code]) {
        objectByRegions[row.region_new_code] = {
          id: row.region_new_code,
          label: row.region_new_name,
          romes: {
            [row.rome]: {
              criterions: [row.criterion],
              opportunite: row.opportunite,
            },
          },
        }
        return
      }

      if (!objectByRegions[row.region_new_code].romes[row.rome]) {
        objectByRegions[row.region_new_code].romes[row.rome] = {
          criterions: [row.criterion],
          opportunite: row.opportunite,
        }
        return
      }

      objectByRegions[row.region_new_code].romes[row.rome].opportunite =
        row.opportunite

      if (
        objectByRegions[row.region_new_code].romes[
          row.rome
        ].criterions.includes(row.criterion)
      )
        return

      objectByRegions[row.region_new_code].romes[row.rome].criterions.push(
        row.criterion
      )
    })

    const instance = await Model.findOne()
    instance.json = sortBy(toArray(objectByRegions), 'label')
    await instance.save()

    console.log('SUCCESS : SYNC REGIONS TENSIONS CRITERIONS')
  }

  return Model
}
