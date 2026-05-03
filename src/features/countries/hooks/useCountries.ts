import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { countriesApi, COUNTRIES_STALE_TIME } from '../api/countries.api'
import { useFilterStore } from '@/store/filterStore'
import { useDebounce } from '@/hooks/useDebounce'

export const COUNTRIES_QUERY_KEY = ['countries'] as const

export function useCountries() {
  const search = useFilterStore((s) => s.search)
  const region = useFilterStore((s) => s.region)
  const debouncedSearch = useDebounce(search, 300)

  const query = useQuery({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: countriesApi.getAll,
    staleTime: COUNTRIES_STALE_TIME,
  })

  const filtered = useMemo(() => {
    if (!query.data) return []

    return query.data.filter((country) => {
      const matchesSearch =
        !debouncedSearch ||
        country.name.common
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())

      const matchesRegion = !region || country.region === region

      return matchesSearch && matchesRegion
    })
  }, [query.data, debouncedSearch, region])

  return { ...query, data: filtered, totalCount: query.data?.length ?? 0 }
}
