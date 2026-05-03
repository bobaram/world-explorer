import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://restcountries.com/v3.1',
  timeout: 10_000,
})
