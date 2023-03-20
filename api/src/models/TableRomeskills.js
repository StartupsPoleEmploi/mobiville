import  { Op, QueryTypes } from 'sequelize'
import { getSkillFromRome } from '../utils/pe-api'
import { sleep } from '../utils/utils'

export default (sequelizeInstance, Model) => {
  Model.syncRomeSkills = async () => {
    console.log('SYNC ROME SKILLS - START')
    const getRomesSync = (await Model.findAll({ group: 'code_rome' })).map(
      (r) => r.code_rome
    )
    const getAllRomesToNeedSync = (
      await Model.models.tensions.findAll({ group: 'rome' })
    ).map((r) => r.rome)

    for (let i = 0; i < getAllRomesToNeedSync.length; i++) {
      const codeRome = getAllRomesToNeedSync[i]
      if (getRomesSync.indexOf(codeRome) === -1) {
        // sync
        const result = (await getSkillFromRome(codeRome)) || []
        for (let x = 0; x < result.length; x++) {
          const element = result[x]
          if (element && element.libelle) {
            await Model.create({
              code_rome: codeRome,
              skill_label: element.libelle,
              logging: false,
            })
          }

          if (
            element &&
            element.noeudCompetence &&
            element.noeudCompetence.libelle
          ) {
            await Model.create({
              code_rome: codeRome,
              skill_label: element.noeudCompetence.libelle,
              logging: false,
            })
          }
        }

        // console.log(result)
        await sleep(1100)
      }
    }

    console.log('SYNC ROME SKILLS - END')
  }

  Model.searchByLabel = async (label) => {
    return (
      await Model.findAll({
        where: {
          skill_label: {
            [Op.like]: `%${(label || '').toLowerCase()}%`,
          },
        },
        limit: 20,
        group: ['skill_label'],
        raw: true,
      })
    ).map((e) => {
      return {
        codeRome: e.code_rome,
        label: e.skill_label,
      }
    })
  }

  Model.getAllCodeRome = async () => {
    return (
      await sequelizeInstance.query(
        'SELECT DISTINCT(code_rome) FROM `romeskills`',
        { type: QueryTypes.SELECT }
      )
    ).map((e) => {
      return {
        codeRome: e.code_rome,
        // label: e.skill_label,
      }
    })
  }

  return Model
}
