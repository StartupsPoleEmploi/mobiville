import {
  CircularProgress,
  FormControl, TextField, Typography
} from '@material-ui/core'
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Button } from '../../components/button'
import { getPosition } from '../../utils/navigator'
import { useCities } from '../../common/contexts/citiesContext'
import { ucFirst } from '../../utils/utils'
import { Espace } from '../../components/espace'
import { COLOR_GRAY, COLOR_PRIMARY } from '../../constants/colors'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 32px 0;
  }
`

const FormLine = styled(FormControl)`
  && {
    margin-bottom: 16px;

    label {
      left: 8px;
    }
  }
`

const Input = styled(TextField)`
  && {
    background-color: ${COLOR_GRAY};

    input {
      padding-left: 8px !important;
    }
  }
`

const GpsIcon = styled.i`
  margin-right: 8px;
  color: ${COLOR_PRIMARY};
`

const Waiting = styled(CircularProgress)`
  && {
    margin-right: 8px;
    color: #00B9B6;
  }
`

const Step1Component = ({ onNext, values }) => {
  const [loadingLocalisation, setLoadingLocalisation] = useState(false)
  const {
    onSearchByLocation, setCity, onSearchByName, city, searchCities, isLoadingLocation
  } = useCities()
  const [inputValue, setInputValue] = useState('')
  const size = useWindowSize()

  const formatedCity = (c) => {
    const nc = c || city
    if (nc) {
      return ucFirst(nc.nom_comm.toLowerCase())
    }

    return ''
  }

  const locateMe = () => {
    setLoadingLocalisation(true)
    getPosition()
      .then(onSearchByLocation)
      .then(() => setLoadingLocalisation(false))
      .catch(() => {
        toast.warn('Impossible de vous localiser !', {
          autoClose: 5000
        })
        setLoadingLocalisation(false)
      })
  }

  const searchNewCities = (event) => onSearchByName({ name: event.target.value })

  useEffect(() => {
    if (city) {
      setInputValue(formatedCity())
    }
  }, [city])

  useEffect(() => {
    if (values && values.from) {
      setCity(values.from)
    }
  }, [values])

  return (
    <Wrapper>
      <Title>Où habitez vous ?</Title>
      <FormLine fullWidth>
        <Autocomplete
          onChange={(event, newValue) => {
            setCity(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={formatedCity}
          options={searchCities.filter((s) => s.id !== null)}
          loading={isLoadingLocation}
          renderInput={(params) => <Input {...params} onKeyUp={searchNewCities} label="Villes" />}
        />
      </FormLine>
      {isMobileView(size) && (
        <Button light onClick={locateMe}>
          {!loadingLocalisation && <GpsIcon className="material-icons">gps_fixed</GpsIcon>}
          {loadingLocalisation && <Waiting size={22} />}
          Me localiser
        </Button>
      )}
      <Espace />
      {city && (
      <Button
        style={{
          border: 'none', fontWeight: 'normal', margin: '32px 0', boxShadow: '0 4px 5px 0 rgba(0,0,0,0.2)'
        }}
        onClick={() => onNext({ from: city })}
      >
        Suivant
      </Button>
      )}
    </Wrapper>
  )
}

Step1Component.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object
}

Step1Component.defaultProps = {
  onNext: () => {},
  values: {}
}

export default Step1Component
