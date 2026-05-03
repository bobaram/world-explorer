import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { CountryGrid } from '@/features/countries/components/CountryGrid'
import { renderWithProviders } from '@/test/utils'
import { useFilterStore } from '@/store/filterStore'
import { server } from '@/mocks/server'

describe('CountryGrid', () => {
  beforeEach(() => useFilterStore.getState().reset())

  it('displays skeleton placeholders while the request is in flight', () => {
    renderWithProviders(<CountryGrid />)
    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders a card for every country returned by the API', async () => {
    renderWithProviders(<CountryGrid />)

    expect(await screen.findByText('Germany')).toBeInTheDocument()
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('Japan')).toBeInTheDocument()
  })

  it('shows the error state when the request fails', async () => {
    server.use(
      http.get('https://restcountries.com/v3.1/all', () => HttpResponse.error())
    )

    renderWithProviders(<CountryGrid />)

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument()
  })

  it('retries the request when the user clicks "Try again"', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('https://restcountries.com/v3.1/all', () => HttpResponse.error())
    )

    renderWithProviders(<CountryGrid />)
    await screen.findByText('Something went wrong')

    server.resetHandlers()

    await user.click(screen.getByRole('button', { name: /try again/i }))
    expect(await screen.findByText('Germany')).toBeInTheDocument()
  })

  it('shows the empty state when no countries match the active filters', async () => {
    useFilterStore.getState().setSearch('zzz_no_match_zzz')

    renderWithProviders(<CountryGrid />)

    expect(await screen.findByText('No countries found')).toBeInTheDocument()
  })
})
