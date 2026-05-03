import { useQuery } from '@tanstack/react-query'
import { countriesApi, COUNTRIES_STALE_TIME } from '../api/countries.api'
import { COUNTRIES_QUERY_KEY } from './useCountries'

export function useCountry(code: string) {
  const { data: countries, isLoading, isError, refetch } = useQuery({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: countriesApi.getAll,
    staleTime: COUNTRIES_STALE_TIME,
    enabled: !!code,
  })

  const country = countries?.find((c) => c.cca3 === code)

  return { data: country, countries, isLoading, isError, refetch }
}
