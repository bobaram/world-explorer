import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { CountryDetailPage } from '@/features/countries/pages/CountryDetailPage'
import { renderWithProviders } from '@/test/utils'
import { server } from '@/mocks/server'

function renderDetailPage(code: string) {
  return renderWithProviders(<CountryDetailPage />, {
    initialEntries: [`/country/${code}`],
    route: '/country/:code',
  })
}

describe('CountryDetailPage', () => {
  it('shows skeleton placeholders while loading', () => {
    renderDetailPage('DEU')
    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders the country name and key details', async () => {
    renderDetailPage('DEU')

    expect(await screen.findByRole('heading', { name: 'Germany' })).toBeInTheDocument()
    expect(screen.getByText('Berlin')).toBeInTheDocument()
    expect(screen.getByText('Europe')).toBeInTheDocument()
    expect(screen.getByText('Western Europe')).toBeInTheDocument()
    expect(screen.getByText('83,240,525')).toBeInTheDocument()
  })

  it('renders currencies and languages', async () => {
    renderDetailPage('DEU')

    await screen.findByRole('heading', { name: 'Germany' })

    expect(screen.getByText('Euro (€)')).toBeInTheDocument()
    expect(screen.getByText('German')).toBeInTheDocument()
  })

  it('renders the native name derived from the nativeName map', async () => {
    renderDetailPage('DEU')

    await screen.findByRole('heading', { name: 'Germany' })
    expect(screen.getByText('Deutschland')).toBeInTheDocument()
  })

  it('renders clickable border country badges', async () => {
    renderDetailPage('DEU')

    await screen.findByRole('heading', { name: 'Germany' })

    expect(screen.getByRole('button', { name: 'France' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Austria' })).not.toBeInTheDocument()
  })

  it('navigates to a border country when its badge is clicked', async () => {
    const user = userEvent.setup()
    renderDetailPage('DEU')

    await screen.findByRole('heading', { name: 'Germany' })
    await user.click(screen.getByRole('button', { name: 'France' }))
  })

  it('renders the error state when the request fails', async () => {
    server.use(
      http.get('https://restcountries.com/v3.1/all', () => HttpResponse.error())
    )

    renderDetailPage('DEU')

    expect(
      await screen.findByText('Could not load country details. Please try again.')
    ).toBeInTheDocument()
  })

  it('does not render the border countries section when borders array is empty', async () => {
    renderDetailPage('JPN')

    await screen.findByRole('heading', { name: 'Japan' })

    expect(screen.queryByText('Border Countries:')).not.toBeInTheDocument()
  })
})
