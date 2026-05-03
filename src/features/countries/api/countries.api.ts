import { httpClient } from '@/lib/httpClient'
import type { Country } from '../types/country.types'

const FIELDS = 'name,cca3,flags,population,region,subregion,capital,currencies,languages,borders'

export const countriesApi = {
  getAll: (): Promise<Country[]> =>
    httpClient
      .get<Country[]>(`/all?fields=${FIELDS}`)
      .then((r) => r.data),
}
