import axios from 'axios'

export const searchCities = (body) => axios.post(`${window.location.protocol}//${window.location.hostname}/api/cities/search`, body).then((response) => (response.data ? response.data.data : []))

export const getCriterions = () => axios.get(`${window.location.protocol}//${window.location.hostname}/api/cities/criterions`).then((response) => (response.data ? response.data.data : {}))
