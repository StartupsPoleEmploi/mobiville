const parse = require('csv-parse')
const { writeFileSync } = require('fs')

function csvToArrayJson(data, options = {}) {
  return new Promise((resolve, reject) => {
    parse(
      data,
      {
        columns: true,
        skip_empty_lines: true,
        delimiter: ';',
        trim: true,
        ...options,
      },
      (err, output) => {
        if (err) reject(err)
        else resolve(output)
      }
    )
  }).then((list) =>
    list.map((tab) => {
      const obj = {}
      for (const p in tab) {
        if (p !== 'depcom' && p !== 'typequ') continue

        obj[
          p
            .replace(/ /g, '_')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
        ] = tab[p]
      }

      return obj
    })
  )
}

function bidule() {
  return csvToArrayJson().then((data) => {
    writeFileSync('result.json', data)
  })
}

module.exports = bidule
