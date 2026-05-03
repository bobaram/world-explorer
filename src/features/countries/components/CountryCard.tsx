import { useNavigate } from 'react-router-dom'
import type { Country } from '../types/country.types'

interface CountryCardProps {
  country: Country
}

export function CountryCard({ country }: CountryCardProps) {
  const navigate = useNavigate()

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/country/${country.cca3}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/country/${country.cca3}`)}
      className="group cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="aspect-[3/2] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={country.flags.svg}
          alt={country.flags.alt ?? `Flag of ${country.name.common}`}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-5 pb-7">
        <h2 className="mb-3 truncate text-base font-bold text-gray-900 dark:text-white">
          {country.name.common}
        </h2>

        <dl className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex gap-1.5">
            <dt className="font-semibold text-gray-800 dark:text-gray-200">Population:</dt>
            <dd>{country.population.toLocaleString()}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="font-semibold text-gray-800 dark:text-gray-200">Region:</dt>
            <dd>{country.region}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="font-semibold text-gray-800 dark:text-gray-200">Capital:</dt>
            <dd className="truncate">{country.capital?.[0] ?? '—'}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
