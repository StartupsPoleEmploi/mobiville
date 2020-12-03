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

const Wrapper = styled.div`
  margin: 0 16px;
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
    background-color: white;

    input {
      padding-left: 8px !important;
    }
  }
`

const GpsIcon = styled.i`
  margin-right: 8px;
  color: #00B9B6;
`

const Waiting = styled(CircularProgress)`
  && {
    margin-right: 8px;
    color: #00B9B6;
  }
`

const Step1Component = ({ onNext }) => {
  const [loadingLocalisation, setLoadingLocalisation] = useState(false)
  const {
    onSearchByLocation, setCity, onSearchByName, city, cities, isLoadingLocation
  } = useCities()
  const [inputValue, setInputValue] = useState('')

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
          options={cities}
          loading={isLoadingLocation}
          renderInput={(params) => <Input {...params} onKeyUp={searchNewCities} label="Villes" />}
        />
      </FormLine>
      <Button light onClick={locateMe}>
        {!loadingLocalisation && <GpsIcon className="material-icons">gps_fixed</GpsIcon>}
        {loadingLocalisation && <Waiting size={22} />}
        Me localiser
      </Button>
      <Espace />
      {city && (
      <Button
        style={{
          backgroundColor: '#00B9B6', border: 'none', fontWeight: 'normal', margin: '16px 0', boxShadow: '0 4px 5px 0 rgba(0,0,0,0.2)'
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
  onNext: PropTypes.func
}

Step1Component.defaultProps = {
  onNext: {}
}

export default Step1Component
