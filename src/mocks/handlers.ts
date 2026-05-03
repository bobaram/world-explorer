import { http, HttpResponse } from 'msw'
import { mockCountries } from './data/countries'

const BASE = 'https://restcountries.com/v3.1'

export const handlers = [
  http.get(`${BASE}/all`, () => {
    return HttpResponse.json(mockCountries)
  }),

  http.get(`${BASE}/alpha/:code`, ({ params }) => {
    const country = mockCountries.find((c) => c.cca3 === params.code)
    if (!country) {
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
    }
    return HttpResponse.json([country])
  }),
]
