import { Card, CardContent, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js'
import styled from 'styled-components'
import { useAdmin } from '../../../common/contexts/adminContext'
import { formatStatsToDataset } from '../../../utils/formats'

const MainCard = styled(Card)` 
  && {
    margin-bottom: 32px;
  }
`

export const SearchCriterions = () => {
  const { getSearchs, searchs } = useAdmin()
  const convasElement = useRef()
  const [chartInstance, setChartInstance] = useState(null)

  const updateChart = () => {
    const data = formatStatsToDataset(searchs, 'codeCriterion')

    if (chartInstance) {
      chartInstance.data = data
      chartInstance.update()
    } else {
      const newChartInstance = new Chart(convasElement.current.getContext('2d'), {
        type: 'line',
        data
      })
      setChartInstance(newChartInstance)
    }
  }

  useEffect(() => {
    getSearchs()
  }, [])

  useEffect(() => {
    updateChart()
  }, [searchs])

  return (
    <MainCard>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Liste des recherches de critères
        </Typography>
        <canvas ref={convasElement} />
      </CardContent>
    </MainCard>
  )
}
