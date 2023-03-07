import sequelize, { QueryTypes } from 'sequelize'
import { getPCSByRome } from '../utils/api'

export default (sequelizeInstance, Model) => {
  Model.syncTensions = async ({ tensions }) => {
    await Model.destroy({ truncate: true })

    let nbInserted = 0
    for (let i = 0; i < tensions.length; i++) {
      const tension = tensions[i]
      nbInserted++
      await Model.create(tension)
    }

    return {
      'nb read': tensions.length,
      'nb inserted': nbInserted,
    }
  }

  Model.fetchJobList = async () => {
    if (Model.jobList) {
      return Model.jobList
    }

    const result = await Model.findAll({
      attributes: ['rome', 'rome_label'],
      group: ['rome', 'rome_label'],
      order: ['rome_label'],
    })

    Model.jobList = result.map((result) => ({
      label: result.rome_label,
      rome: result.rome,
    }))

    return Model.jobList
  }

  Model.syncPCS = async () => {
    console.log('sync datas')

    const result = await Model.findAll({
      attributes: ['id', 'rome', 'pcs', 'fap'],
      where: {
        pcs: null,
      },
      paranoid: false,
    })

    console.log(`${result.length} lignes a mettre a jour`)
    for (let i = 0; i < result.length; i++) {
      const row = result[i]
      const pcs = await getPCSByRome(row.dataValues.rome)
      await row.update({ pcs })
    }
  }

  Model.getTauxdOpportunite = async () => {
    return Model.findAll({
      attributes: [
        'rome',
        [
          sequelize.literal(
            'CAST(sum(ind_t < 4) / count(tensions.bassin_id) AS DECIMAL(12,2))'
          ),
          'opportunite',
        ],
      ],
      include: {
        attributes: ['reg'],
        model: Model.models.bassins,
        required: true,
      },
      group: ['rome', 'bassins.reg'],
    }).then((r) =>
      r.map((v) => ({
        code_rome: v.rome,
        code_region: v.dataValues.bassins[0].reg,
        opportunite: parseFloat(v.dataValues.opportunite),
      }))
    )
  }

  Model.findTopJobs = async ({ insee }) => {
    return await sequelizeInstance.query(
      ` select t.rome, t.rome_label, b.nom_com, t.ind_t
        from bassins b 
        inner join tensions t on t.bassin_id = b.bassin_id 
        where b.code_commune_insee = :codeInsee
        AND b.deleted_at is NULL AND t.deleted_at IS NULL
        ORDER BY ind_t ASC
        LIMIT :maxItems ;
      `,
      {
        replacements: { codeInsee: String(insee), maxItems: 10 },
        type: QueryTypes.SELECT,
      }
    )
  }
  Model.findTopJobsByDepartement = async ({
    codeDepartement,
    maxItems = 10,
  }) => {
    return await sequelizeInstance.query(
      ` select t.rome, t.rome_label ,
        CAST( AVG(t.ind_t) as FLOAT) as 'avg_ind_t',
        ( select COUNT(b.id) from bassins b where b.deleted_at is NULL AND b.bassin_id = t.bassin_id ) as 'count_city'
        -- Attention: count_city ne compte que les villes sur l'un des bassins du code Rome en question et non toute le nb de villes avec du potentiel 
        from tensions t
        where t.bassin_id in (select b.bassin_id from bassins b where b.deleted_at is NULL AND b.dep = :codeDep)
        AND t.deleted_at is NULL
        GROUP BY t.rome
        ORDER BY AVG(t.ind_t) ASC, 'count_city' DESC
        LIMIT :maxItems ;
      `,
      {
        replacements: { codeDep: String(codeDepartement), maxItems: maxItems },
        type: QueryTypes.SELECT,
      }
    )
  }
  return Model
}
