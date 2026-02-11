import axios from 'axios'

const approvaApi = axios.create({
  baseURL: 'http://localhost:3000/api', //! Change this
})

export default approvaApi
