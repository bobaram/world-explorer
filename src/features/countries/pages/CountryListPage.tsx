import { CountryFilters } from '../components/CountryFilters'
import { CountryGrid } from '../components/CountryGrid'
import { useCountries } from '../hooks/useCountries'

export function CountryListPage() {
  const { data: countries, totalCount } = useCountries()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Countries of the World
        </h1>
        {totalCount > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {countries.length}
            </span>{' '}
            of{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {totalCount}
            </span>{' '}
            countries
          </p>
        )}
      </div>

      <div className="mb-8">
        <CountryFilters />
      </div>

      <CountryGrid />
    </div>
  )
}
