import dataFormat from 'dateformat'
import { COLOR_PALETTE } from '../contants/colors'

export const formatStatsToDataset = (stats, codeType) => {
  const list = []
  const datasets = []
  const labels = []

  stats.filter((s) => s.type === codeType).forEach((s) => {
    const findExist = list.find((d) => d.label === s.label)
    const day = new Date(s.created_at)
    const dayDate = new Date(day.getFullYear(), day.getMonth(), day.getDate())
    if (findExist) {
      const findValue = findExist.data.find((d) => d.date.toString() === dayDate.toString())
      if (findValue) {
        findValue.qty += 1
      } else {
        findExist.data.push({ qty: 1, date: dayDate })
      }
    } else {
      list.push({ label: s.label, data: [{ qty: 1, date: dayDate }] })
    }
  })

  // get min and max
  let min = null
  let max = null
  list.forEach((e) => {
    e.data.forEach((value) => {
      if (max === null || value.date > max) {
        max = new Date(value.date)
      }

      if (min === null || value.date < min) {
        min = new Date(value.date)
      }
    })
  })

  // convert to data
  if (min) {
    const currentDate = new Date(min)
    while (currentDate <= max) {
      const currentDateFormated = dataFormat(currentDate, 'dd/mm/yyyy')
      labels.push(currentDateFormated)

      if (datasets.length === 0) {
        list.forEach((l, index) => datasets.push({
          label: l.label, fill: false, borderColor: COLOR_PALETTE[index], data: []
        }))
      }

      list.forEach((l, index) => {
        const findData = l.data.find((d) => d.date.toString() === currentDate.toString())

        datasets[index].data.push(findData ? findData.qty : 0)
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }
  }

  return { labels, datasets }
}
