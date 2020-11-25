import axios from 'axios'

export const searchProfessions = (body) => axios.post('/api/professions/search', body).then((response) => (response.data ? response.data.data : []))
