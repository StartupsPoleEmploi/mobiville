const { readFileSync } = require('fs')
const parse = require('csv-parse/lib/sync')

module.exports = {
  up: async (queryInterface, Sequelize, models) => {
    const data = parse(
      readFileSync(__dirname + '/../../../assets/datas/helps.csv'),
      {
        columns: true,
        skip_empty_lines: true,
        delimiter: ';',
        trim: true,
      }
    ).map((helpData) => ({
      ...helpData,
      description: helpData.description.replace(/\n/g, '<br />'),
    }))

    console.log(data)

    await models.helps.destroy({
      where: {},
      truncate: true,
    })

    for (const help of data) {
      await models.helps.create(help)
    }
  },
}
