import axios from 'axios'

export const fetchRegions = () =>
  axios
    .get(`/api/region`)
    .then((response) => response.data || null)
