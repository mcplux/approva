import axios from 'axios'

const approvaApi = axios.create({
  baseURL: 'http://localhost:3000/api', //! Change this
})

approvaApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

export default approvaApi
