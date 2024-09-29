import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '2e020d00-8b19-4190-98dc-9465e39ef8b1',
  },
})
