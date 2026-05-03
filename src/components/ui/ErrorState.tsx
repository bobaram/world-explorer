import { AlertTriangle } from 'lucide-react'
import { Button } from './Button'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Failed to load data. Please check your connection and try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <AlertTriangle size={48} className="mb-4 text-red-400 dark:text-red-500" />
      <p className="text-base font-semibold text-gray-700 dark:text-gray-300">{title}</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-5">
          Try again
        </Button>
      )}
    </div>
  )
}
