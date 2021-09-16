import axios from 'axios'

export const apiLoadHelpPreviews = () =>
  axios
    .get('/api/helps/get-previews')
    .then((response) => (response.data ? response.data.data : []))

export const apiLoadHelpPreview = (slug) =>
  axios
    .get(`/api/helps/get-preview/${slug}`)
    .then((response) => (response.data ? response.data.data : null))
