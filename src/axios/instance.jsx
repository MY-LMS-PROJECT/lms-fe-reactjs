import axios from 'axios'

const axiosCustom = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
})

axiosCustom.interceptors.request.use(
  function (config) {
    // config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
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
