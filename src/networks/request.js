import axios from "axios"

axios.defaults.baseURL = "https://www.point9.xyz:8651"
axios.defaults.timeout = 5000

export default function request(config) {
  const instance = axios.create({
    withCredentials: true,
  })
  instance.interceptors.response.use(res => {
    return res.data
  })
  return instance(config)
}