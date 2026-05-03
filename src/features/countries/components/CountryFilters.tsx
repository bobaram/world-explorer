import { SearchInput } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useFilterStore } from '@/store/filterStore'

const REGION_OPTIONS = [
  { label: 'Africa', value: 'Africa' },
  { label: 'Americas', value: 'Americas' },
  { label: 'Asia', value: 'Asia' },
  { label: 'Europe', value: 'Europe' },
  { label: 'Oceania', value: 'Oceania' },
  { label: 'Antarctic', value: 'Antarctic' },
]

export function CountryFilters() {
  const search = useFilterStore((s) => s.search)
  const region = useFilterStore((s) => s.region)
  const setSearch = useFilterStore((s) => s.setSearch)
  const setRegion = useFilterStore((s) => s.setRegion)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <SearchInput value={search} onChange={setSearch} />
      <Select
        value={region}
        onChange={setRegion}
        options={REGION_OPTIONS}
        placeholder="Filter by Region"
      />
    </div>
  )
}
