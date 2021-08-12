const { readFileSync } = require('fs')
const parser = require('xml2json')

module.exports = {
  up: async (queryInterface, Sequelize, models) => {
    const data = JSON.parse(
      parser.toJson(
        readFileSync(
          __dirname +
            '/../../../assets/datas/unix_referentiel_code_rome_v346_utf8.xml'
        )
      )
    ).ogr.item_referentiel_code_rome

    await models.romeCodes.destroy({
      where: {},
      truncate: true,
    })

    for (const row of data) {
      await models.romeCodes.create({
        code: row.code_rome,
        label: row.libelle,
      })
    }
  },
}
