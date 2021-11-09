import axios from 'axios'
const instance = axios.create({
  timeout: 600000,
  baseURL: process.env.BASE_URL,
})
instance.interceptors.request.use(
  config => {
    //
    return config
  },
  error => {
    return Promise.reject(error)
  },
)
instance.interceptors.response.use(
  res => {
    return Promise.resolve(res)
  },
  error => {
    return Promise.reject(error)
  },
)

export const GET = instance.get
export const POST = instance.post
export const DELETE = instance.delete
export const PUT = instance.put
