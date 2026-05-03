import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { CountryListPage } from '@/features/countries/pages/CountryListPage'
import { CountryDetailPage } from '@/features/countries/pages/CountryDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <CountryListPage /> },
      { path: 'country/:code', element: <CountryDetailPage /> },
    ],
  },
])
