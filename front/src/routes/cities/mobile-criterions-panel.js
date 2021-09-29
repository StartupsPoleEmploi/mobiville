import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import TuneIcon from '@material-ui/icons/Tune'

import { useCities } from '../../common/contexts/citiesContext'
import { ucFirst } from '../../utils/utils'
import { COLOR_GRAY, COLOR_PRIMARY } from '../../constants/colors'
import CitiesFilterList from './cities-filter-list'

const EmptySpace = styled.div`
  height: 216px;
`

const Wrapper = styled.div`
  padding: 16px 16px 20px 16px;
  background-color: white;
  margin-bottom: 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
  background: ${COLOR_GRAY};
  border-radius: 1000px;
  padding: 4px 6px;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${COLOR_PRIMARY};
`

const SubInfo = styled.div`
  display: flex;
  align-items: center;

  p {
    font-weight: 500;
    flex: 1;
  }

  span {
    font-weight: 700;
  }
`

const MobileCriterionsSelection = ({
  criterions,
  showMobileCriterionsSelection,
  total,
}) => {
  const { criterions: allCriterions } = useCities()

  const findCriterionsValue = (val) => {
    let foundLabel = null
    if (allCriterions) {
      Object.values(allCriterions).forEach((allCrit) => {
        const find = allCrit.find(
          (c) => (c.key && c.key === val) || (c.id && c.id === val)
        )
        if (find) {
          foundLabel = ucFirst(find.label.toLowerCase())
        }
      })
    }

    return foundLabel
  }

  const tagsList = Object.values(criterions).reduce((prev, criterion) => {
    const searchValue = findCriterionsValue(criterion)
    if (!searchValue || prev.includes(searchValue)) return prev
    return prev.concat(searchValue)
  }, [])

  return (
    <EmptySpace>
      <Wrapper>
        <Title>Mes critères</Title>
        <TagsBlock>
          <Tag
            onClick={() => showMobileCriterionsSelection(true)}
            role="button"
            tabIndex="0"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#191970',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <TuneIcon fontSize="small" style={{ marginRight: 8 }} />
            Modifier
          </Tag>
          {tagsList.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </TagsBlock>
        <SubInfo>
          <Typography>
            <span>{total}</span>{' '}
            {total > 1 ? 'villes correspondantes' : 'ville correspondant'}
          </Typography>
          <CitiesFilterList />
        </SubInfo>
      </Wrapper>
    </EmptySpace>
  )
}

MobileCriterionsSelection.propTypes = {
  criterions: PropTypes.object,
  showMobileCriterionsSelection: PropTypes.func.isRequired,
  total: PropTypes.number,
}

MobileCriterionsSelection.defaultProps = {
  criterions: [],
  total: 0,
}

export default MobileCriterionsSelection
