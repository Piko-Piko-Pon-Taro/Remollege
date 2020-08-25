// TODO:
// - 例外処理実装して欲しいなぁ

import axios from 'axios'

export default ({ app }, inject) => {
  const api = axios.create({
    baseURL: 'http://localhost:3000/'
  })
  inject('api', api)
}
