import React, { useEffect } from 'react'
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

const SpaceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  svg {
    margin-left: 8px;
  }
`

const CitiesFilterList = () => {
  const { setSortCriterions, sortCriterions } = useCities()

  useEffect(() => {
    setSortCriterions('')
  }, [])

  return (
    <Wrapper>
      <SelectBlock
        displayEmpty
        value={sortCriterions}
        onChange={(event) => setSortCriterions(event.target.value)}
      >
        <MenuItem value="">
          <SpaceItem>
            Nombre d{"'"}
            habitants
            <FilterListIcon />
          </SpaceItem>
        </MenuItem>
        <MenuItem value="mer">
          <SpaceItem>
            Plus proche de la mer
            <FilterListIcon />
          </SpaceItem>
        </MenuItem>
        <MenuItem value="montagne">
          <SpaceItem>
            Plus en montagne
            <FilterListIcon />
          </SpaceItem>
        </MenuItem>
      </SelectBlock>
    </Wrapper>
  )
}

CitiesFilterList.propTypes = {}

CitiesFilterList.defaultProps = {}

export default CitiesFilterList
