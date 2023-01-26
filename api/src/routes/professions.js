import Router from '@koa/router'
import Sequelize from 'sequelize'

const router = new Router({ prefix: '/professions' })

import {
  searchJob,
  infosTravail,
  infosTensionTravail,
  searchJobCount,
} from '../utils/pe-api'
import { getHiringRate } from '../utils/smart-emploi-api'
import { getInseeCodesForSearch, getTotalOffres } from '../utils/utils'
import { meanBy } from 'lodash'

router.post(
  '/search',
  async ({
    request: {
      body: { codeRome, insee },
    },
    response,
  }) => {
    const result = await searchJob({
      codeRome,
      insee: getInseeCodesForSearch(insee),
    })
    response.body = {
      resultats: result ? result.resultats : [],
      totalOffres: result ? getTotalOffres(result) : 0,
    }
  }
)

router.post(
  '/searchCountList',
  async ({
    request: {
      body: { codeRome, inseeList },
    },
    response,
  }) => {
    const callToSearchJobCount = async (insee) => ({
      insee: insee,
      total: getTotalOffres(
        await searchJobCount({
          codeRome,
          insee: getInseeCodesForSearch(insee),
          distance: 30,
        })
      ),
    })

    let responseArray = []
    if (inseeList.length > 10) {
      // on divise par deux la taille de la liste si elle est trop grande pour limiter le nombre d'appels asynchrones
      const half = Math.ceil(inseeList.length / 2)
      responseArray.push(
        ...(await Promise.all(
          inseeList.slice(0, half).map((insee) => callToSearchJobCount(insee))
        )),
        ...(await Promise.all(
          inseeList.slice(half).map((insee) => callToSearchJobCount(insee))
        ))
      )
    } else {
      responseArray.push(
        ...(await Promise.all(
          inseeList.map((insee) => callToSearchJobCount(insee))
        ))
      )
    }

    response.body = JSON.stringify(responseArray)
  }
)

router.post(
  '/searchRomeonly',
  async ({
    request: {
      body: { codeRome },
    },
    response,
  }) => {
    const result = await searchJob({
      codeRome,
    })
    if (result) {
      const total = result.resultats.length
      response.body = '{total:' + total + '}'
    } else {
      response.body = []
    }
  }
)

router.post(
  '/infos-travail',
  async ({
    request: {
      body: { codeRome, insee },
    },
    models,
    response,
  }) => {
    //https://dares.travail-emploi.gouv.fr/donnees/la-nomenclature-des-familles-professionnelles-fap-2009

    let city = null
    let pcs = null

    if (codeRome) {
      [city, pcs] = await Promise.all([
        models.cities.findOne({
          where: { insee_com: insee },
          raw: true,
          include: {
            attributes: ['bassin_id'],
            model: models.cities.models.bassins,
            required: false,
            include: [
              {
                attributes: ['ind_t'],
                model: models.bassins.models.tensions,
                required: false,
                where: {
                  rome: codeRome,
                },
              },
            ],
          },
        }),
        models.cities.models.tensions.findOne({
          where: {
            rome: codeRome,
          },
          raw: true,
        })
      ])
    } else {
      city = await models.cities.findOne({
        where: { insee_com: insee },
        raw: true,
        include: {
          attributes: ['bassin_id'],
          model: models.cities.models.bassins,
          required: false,
          include: [
            {
              attributes: [
                [Sequelize.fn('AVG', Sequelize.col('ind_t')), 'ind_t'],
              ],
              model: models.bassins.models.tensions,
              required: false,
            },
          ],
        },
      })
    }

    const bassinId = city && city['bassin.bassin_id']

    if (!bassinId || (codeRome && !pcs)) {
      response.body = null
      return
    }

    const [
      infosResult,
      { bassin: bassinStatsResult, dept: deptStatsResult },
      hiringRate,
    ] = await Promise.all([
      infosTravail({
        codeProfession: pcs ? pcs.pcs : null,
        codeDept: city.code_dept
      }),
      infosTensionTravail({
        bassinId,
        codeRome,
        codeDept: city.code_dept,
      }),
      getHiringRate({
        codeTerritoire: bassinId,
        codeRome,
      }),
    ]).catch((err) => {
      // A better handling of errors should be included, but for now we’ll do with just not screwing the whole app
      // as this previously did
      console.error(err)
      return [null, { bassin: null, dept: null }, null]
    })

    const bassinTension =
      (bassinStatsResult &&
        bassinStatsResult.result &&
        bassinStatsResult.result.records &&
        bassinStatsResult.result.records[0] &&
        bassinStatsResult.result.records[0].TENSION_RATIO) ||
      null

    const deptTension =
      (deptStatsResult &&
        deptStatsResult.result &&
        deptStatsResult.result.records &&
        deptStatsResult.result.records[0] &&
        deptStatsResult.result.records[0].TENSION_RATIO) ||
      null

    let min = null
    let max = null

    if (infosResult && infosResult.result && infosResult.result.records) {
      const records = infosResult.result.records.map((r) => ({
        ...r,
        MINIMUM_SALARY: +r.MINIMUM_SALARY,
        MAXIMUM_SALARY: +r.MAXIMUM_SALARY,
      }))
      min = meanBy(records, 'MINIMUM_SALARY')
      max = meanBy(records, 'MAXIMUM_SALARY')
    }

    response.body = {
      bassinId: city['bassin.bassin_id'],
      bassinTensionIndT: city['bassin.tensions.ind_t'],
      min,
      max,
      bassinTension,
      deptTension,
      hiringRate: hiringRate ? hiringRate : null,
    }
  }
)

export default router
