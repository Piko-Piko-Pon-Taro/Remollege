import axios from 'axios'

export default ({ app }, inject) => {
  const api = axios.create({
    baseURL: 'http://localhost:3000/'
  })
  inject('api', api)
}
