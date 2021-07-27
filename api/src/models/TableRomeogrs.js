import { Op, col, fn } from 'sequelize'
import { getOgrFromRome } from '../utils/pe-api'
import { sleep } from '../utils/utils'

export default (sequelizeInstance, Model) => {
  Model.syncRomeOgrs = async () => {
    console.log('SYNC ROME OGRS - START')
    const getRomesSync = (await Model.findAll({group: 'code_rome'})).map(r => (r.code_rome))
    const getAllRomesToNeedSync = (await Model.models.tensions.findAll({group: 'rome'})).map(r => (r.rome))

    for(let i = 0; i < getAllRomesToNeedSync.length; i++) {
      const codeRome = getAllRomesToNeedSync[i]
      if(getRomesSync.indexOf(codeRome) === -1) {
        // sync
        const result = (await getOgrFromRome(codeRome) || [])
        for(let x = 0; x < result.length; x++) {
          const element = result[x]
          await Model.create({
            code_rome: codeRome,
            code_ogr: element.code,
            ogr_label: element.libelle,
            logging: false,
          })
        }

        // console.log(result)
        await sleep(1100)
      }
    }

    console.log('SYNC ROME OGRS - END')
  }

  Model.searchByLabel = async (label) => {
    return (await Model.findAll({
      where: {
        ogr_label: {
          // replace space by wildcard to allow for simple search of "aide-soignant" for "aide soignant"
          [Op.like]: `%${(label || '').toLowerCase().trim().replace(/ /g, '_')}%`,
        },
      },
      limit: 20,
      group: ['ogr_label'],
      raw: true,
    })).map(e => {
      return {
        codeRome: e.code_rome,
        label: e.ogr_label,
      }
    })
  }

  Model.fetchAllAvailable = async () => {
    const availableRomeCodes = (await Model.models.regionsTensions.findAll({
      attributes: ['rome'],
      group: ['rome'],
    })).map(({rome }) => rome)


    const result = await Model.findAll({
      attributes: ['code_rome', 'ogr_label'],
      include: {
        attributes: ['label'],
        model: Model.models.romeCodes,
      },
      where: {
        code_rome: availableRomeCodes,
      },
    })

    return result.map(row => ({
      rome: row.code_rome,
      romeLabel: row.romeCode.label,
      ogrLabel: row.ogr_label,
    }))
  }

  return Model
}
