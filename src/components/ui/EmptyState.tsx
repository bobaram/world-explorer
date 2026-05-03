import { Globe } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No countries found',
  description = 'Try adjusting your search or filter to find what you are looking for.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Globe size={48} className="mb-4 text-gray-300 dark:text-gray-600" />
      <p className="text-base font-semibold text-gray-700 dark:text-gray-300">{title}</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">{description}</p>
    </div>
  )
}
