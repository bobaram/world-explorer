import { useParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useCountry } from '../hooks/useCountry'
import { Badge } from '@/components/ui/Badge'
import { ErrorState } from '@/components/ui/ErrorState'

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-10 h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="aspect-[3/2] rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-4">
          <div className="h-8 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-gray-200 dark:bg-gray-700" style={{ width: `${60 + i * 8}%` }} />
              ))}
            </div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-gray-200 dark:bg-gray-700" style={{ width: `${50 + i * 10}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap gap-1 text-sm">
      <span className="font-semibold text-gray-800 dark:text-gray-200">{label}:</span>
      <span className="text-gray-600 dark:text-gray-400">{value}</span>
    </div>
  )
}

export function CountryDetailPage() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()

  const { data: country, countries, isLoading, isError, refetch } = useCountry(code ?? '')

  const borderCountries = useMemo(() => {
    if (!country?.borders?.length || !countries) return []
    return country.borders.map((borderCode) => {
      const found = countries.find((c) => c.cca3 === borderCode)
      return { code: borderCode, name: found?.name.common ?? borderCode }
    })
  }, [country, countries])

  const nativeName = useMemo(() => {
    if (!country?.name.nativeName) return country?.name.common ?? ''
    const firstKey = Object.keys(country.name.nativeName)[0]
    return country.name.nativeName[firstKey]?.common ?? country.name.common
  }, [country])

  const currencies = useMemo(() => {
    if (!country?.currencies) return '—'
    return Object.values(country.currencies)
      .map((c) => `${c.name} (${c.symbol})`)
      .join(', ')
  }, [country])

  const languages = useMemo(() => {
    if (!country?.languages) return '—'
    return Object.values(country.languages).join(', ')
  }, [country])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-10 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {isLoading && <DetailSkeleton />}

      {isError && (
        <ErrorState
          description="Could not load country details. Please try again."
          onRetry={refetch}
        />
      )}

      {country && (
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-xl shadow-md">
            <img
              src={country.flags.svg}
              alt={country.flags.alt ?? `Flag of ${country.name.common}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {country.name.common}
            </h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10">
              <div className="space-y-2">
                <DetailRow label="Native Name" value={nativeName} />
                <DetailRow label="Population" value={country.population.toLocaleString()} />
                <DetailRow label="Region" value={country.region} />
                {country.subregion && (
                  <DetailRow label="Sub Region" value={country.subregion} />
                )}
                <DetailRow label="Capital" value={country.capital?.[0] ?? '—'} />
              </div>

              <div className="space-y-2">
                <DetailRow label="Currencies" value={currencies} />
                <DetailRow label="Languages" value={languages} />
              </div>
            </div>

            {borderCountries.length > 0 && (
              <div>
                <p className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Border Countries:
                </p>
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((border) => (
                    <button
                      key={border.code}
                      onClick={() => navigate(`/country/${border.code}`)}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                    >
                      <Badge>{border.name}</Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
