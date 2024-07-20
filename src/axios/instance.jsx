import { BACKEND_URL } from '@src/utils/const'
import axios from 'axios'

const axiosCustom = axios.create({
  baseURL: `${BACKEND_URL}`,
})

axiosCustom.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axiosCustom.interceptors.response.use(
  function (response) {
    return response?.data
  },
  async function (error) {
    return Promise.reject(error)
  },
)

export default axiosCustom
