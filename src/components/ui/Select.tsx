import { ChevronDown } from 'lucide-react'

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
        className="w-full appearance-none rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 pr-10 text-sm text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow cursor-pointer"
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
