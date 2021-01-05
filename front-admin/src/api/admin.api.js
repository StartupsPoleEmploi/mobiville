import axios from 'axios'

export const adminGetSearchs = () => axios.get('/api/admin/searchs').then((data) => data.data.data || [])
