import axios from 'axios'

export const apiLoadHelpPreviews = () =>
  axios
    .get('/api/helps/get-previews')
    .then((response) => (response.data ? response.data.data : []))

export const apiLoadHelpPreviewId = (id) =>
  axios
    .get(`/api/helps/get-preview/${id}`)
    .then((response) => (response.data ? response.data.data : null))
