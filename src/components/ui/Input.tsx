import { Search } from 'lucide-react'
import { formFieldClasses } from './styles'

interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Search for a country...' }: InputProps) {
  return (
    <div className="relative w-full sm:w-96">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${formFieldClasses}`}
      />
    </div>
  )
}
