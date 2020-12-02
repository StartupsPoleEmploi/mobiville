import {
  CircularProgress,
  FormControl, TextField, Typography
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Button } from '../../components/button'
import { getPosition } from '../../utils/navigator'
import { useCities } from '../../common/contexts/citiesContext'
import { ucFirst } from '../../utils/utils'

const Wrapper = styled.div`
  margin: 0 16px;
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
      padding-left: 8px;
      padding-right: 8px;
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
  const {
    handleSubmit, setValue, control
  } = useForm()

  const formatedCity = () => {
    if (city) {
      return ucFirst(city.nom_comm.toLowerCase())
    }

    return ''
  }

  const locateMe = () => {
    setLoadingLocalisation(true)
    getPosition()
      .then(onSearchByLocation)
      .then(() => setLoadingLocalisation(false))
      .catch(() => setLoadingLocalisation(false))
  }

  const searchNewCities = (event) => onSearchByName({ name: event.target.value })

  const onSubmit = () => {
    console.log(city)
  }

  useEffect(() => {
    if (city) {
      setValue('city', formatedCity())
    }
  }, [city])

  console.log('cities', cities)
  // add empty value
  cities.push({ id: '', nom_comm: '' })

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Où habitez vous ?</Title>
        <FormLine fullWidth>
          <Controller
            render={({ onChange, ...props }) => (
              <Autocomplete
                onChange={(event, newValue) => {
                  // setValue(newValue);
                  console.log(newValue)
                }}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => ucFirst(option.nom_comm)}
                options={cities}
                loading={isLoadingLocation}
                renderInput={(params) => <Input {...params} onKeyUp={searchNewCities} label="Villes" />}
                {...props}
              />
            )}
            onChange={([, data]) => { setCity(data) }}
            name="city"
            control={control}
            defaultValue=""
          />
        </FormLine>
        <Button light onClick={locateMe}>
          {!loadingLocalisation && <GpsIcon className="material-icons">gps_fixed</GpsIcon>}
          {loadingLocalisation && <Waiting size={22} />}
          Me localiser
        </Button>
        {city && <Button onClick={() => onNext()}>Suivant</Button>}
      </form>
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
