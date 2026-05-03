import { CountryCard } from './CountryCard'
import { CountryCardSkeleton } from './CountryCardSkeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { useCountries } from '../hooks/useCountries'

export function CountryGrid() {
  const { data: countries, isLoading, isError, refetch } = useCountries()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <CountryCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />
  }

  if (countries.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
}
