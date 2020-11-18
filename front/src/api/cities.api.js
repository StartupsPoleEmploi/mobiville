import axios from 'axios'

export const searchCities = (body) => axios.post('/api/cities/search', body).then((response) => (response.data ? response.data.data : []))
