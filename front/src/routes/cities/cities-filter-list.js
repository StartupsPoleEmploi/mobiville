import React from 'react'
import styled from 'styled-components'
import { MenuItem, Select } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'
import { useCities } from '../../common/contexts/citiesContext'

const Wrapper = styled.div` 
  display: flex;
  align-items: center;
`

const SelectBlock = styled(Select)`
  && {
    margin-right: 11px;

    &.MuiInput-underline:before {
      border-bottom: none !important;
    }

    .MuiSelect-select {
      background-color: transparent !important;
    }

    .MuiSelect-icon {
      display: none;
    }
  }
`

const CitiesFilterList = () => {
  const {
    setSortCriterions,
    sortCriterions
  } = useCities()

  return (
    <Wrapper>
      <SelectBlock
        displayEmpty
        value={sortCriterions}
        onChange={(event) => setSortCriterions(event.target.value)}
      >
        <MenuItem value="">Pertinence</MenuItem>
        <MenuItem value="habitant">
          Nombre d
          {'\''}
          habitant
        </MenuItem>
        <MenuItem value="mer">Plus proche de la mer</MenuItem>
        <MenuItem value="montagne">Plus en montagne</MenuItem>
      </SelectBlock>
      <FilterListIcon />
    </Wrapper>
  )
}

CitiesFilterList.propTypes = {
}

CitiesFilterList.defaultProps = {
}

export default CitiesFilterList
