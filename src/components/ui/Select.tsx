import { ChevronDown } from 'lucide-react'
import { formFieldClasses } from './styles'

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  placeholder?: string
}

export function Select({ value, onChange, options, placeholder = 'Filter by Region' }: SelectProps) {
  return (
    <div className="relative w-52">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none px-4 py-3 pr-10 cursor-pointer ${formFieldClasses}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
      />
    </div>
  )
}
