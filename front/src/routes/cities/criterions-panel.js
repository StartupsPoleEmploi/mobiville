import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { useCities } from '../../common/contexts/citiesContext'
import { ucFirst } from '../../utils/utils'

const Wrapper = styled.div` 
  padding: 16px;
  background-color: white;
`

const Title = styled(Typography)`
  && {
    font-weight: bold;
  }
`

const TagsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0 20px 0;
`

const Tag = styled.div`
  background: #99DBF6;
  border-radius: 1000px;
  padding: 4px;
  font-size: 12px;
  margin-right: 8px;
  font-weight: 500;
`

const SubInfo = styled.div`
  display: flex;

  p {
    font-weight: 500;
  }

  span {
    font-weight: 700;
  }
`

const CriterionsPanel = ({ criterions, total }) => {
  const { criterions: allCriterios } = useCities()

  const findCriterionsValue = (val) => {
    let findedLabel = ''
    Object.values(allCriterios).forEach((allCrit) => {
      const find = allCrit.find((c) => (c.key && c.key === val) || (c.id && c.id === val))
      if (find) {
        findedLabel = ucFirst(find.label.toLowerCase())
      }
    })

    return findedLabel
  }

  const tagsList = []
  Object.values(criterions).forEach((crit) => {
    crit.forEach((val) => {
      tagsList.push(findCriterionsValue(val))
    })
  })

  return (
    <Wrapper>
      <Title>Mes critères</Title>
      <TagsBlock>
        {tagsList.map((t) => (<Tag key={t}>{t}</Tag>))}
      </TagsBlock>
      <SubInfo>
        <Typography>
          <span>{total}</span>
          {' '}
          {total > 1 ? 'villes correspondantes' : 'ville correspondant'}
        </Typography>
      </SubInfo>
    </Wrapper>
  )
}

CriterionsPanel.propTypes = {
  criterions: PropTypes.object,
  total: PropTypes.number
}

CriterionsPanel.defaultProps = {
  criterions: [],
  total: 0
}

export default CriterionsPanel
