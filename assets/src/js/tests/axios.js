import axios from 'axios'
// $FlowFixMe
import httpAdapter from 'axios/lib/adapters/http'

export const host = 'http://localhost'
axios.defaults.baseURL = host
axios.defaults.adapter = httpAdapter
