import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/dev'
  //baseURL: 'https://kdjsicjk6k.execute-api.eu-central-1.amazonaws.com/dev'
})

instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance