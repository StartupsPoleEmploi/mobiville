import axios from 'axios'

export const searchCities = (body) => axios.post('/api/cities/search', body).then((response) => (response.data ? response.data.data : []))

export const getCriterions = () => axios.get('/api/cities/criterions').then((response) => (response.data ? response.data.data : null))

export const loadCity = (insee) => axios.get(`/api/cities/load/${insee}`).then((response) => (response.data ? response.data.data : null))

export const searchCityByLocation = (body) => axios.post('/api/cities/search-by-location', body).then((response) => (response.data ? response.data.data : null))

export const searchCityByName = (body) => axios.post('/api/cities/search-by-name', body).then((response) => (response.data ? response.data.data : []))
