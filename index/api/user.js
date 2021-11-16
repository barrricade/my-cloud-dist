import { GET, POST } from '../utils/ajax'
export function getCaptcha(data) {
  return `/cloud/captcha?v=${data}`
}
export function userLogin(data) {
  return POST("/cloud/login", data)
}
export function register(data) {
  return POST("/cloud/add_user", data)
}