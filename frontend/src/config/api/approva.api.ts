import axios from 'axios'

const approvaApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
