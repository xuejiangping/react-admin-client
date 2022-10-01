import axios from 'axios'
import { message } from 'antd'
export default function http(url,data,method = 'get') {

  return new Promise(res => {
    axios({
      url,method,
      // baseURL: 'http://localhost:3000',
      [method === 'get' ? 'params' : 'data']: data,
    }).then(({ data }) => res(data))
      .catch(err => {
        message.error('请求出错:  ' + err.message)
      })
  })
}