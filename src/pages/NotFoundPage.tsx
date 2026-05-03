import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center">
      <MapPin size={48} className="mb-4 text-gray-300 dark:text-gray-600" />
      <h1 className="text-6xl font-extrabold text-gray-200 dark:text-gray-700">404</h1>
      <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300">Page not found</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Go home
      </button>
    </div>
  )
}
