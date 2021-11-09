import { GET, POST } from '../utils/ajax'
export function getCaptcha(data) {
    return GET(`cloud/captcha?v=${data}`)
  }