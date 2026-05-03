import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CountryListPage } from '@/features/countries/pages/CountryListPage'
import { renderWithProviders } from '@/test/utils'
import { useFilterStore } from '@/store/filterStore'

describe('CountryListPage', () => {
  beforeEach(() => useFilterStore.getState().reset())

  it('renders the page heading', () => {
    renderWithProviders(<CountryListPage />)
    expect(screen.getByText('Countries of the World')).toBeInTheDocument()
  })

  it('shows the result count once data has loaded', async () => {
    renderWithProviders(<CountryListPage />)
    expect(await screen.findByText(/showing/i)).toBeInTheDocument()
    expect(screen.getAllByText('3')).toHaveLength(2)
  })

  it('filters the list as the user types in the search box', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CountryListPage />)

    await screen.findByText('Germany')

    await user.type(screen.getByPlaceholderText('Search for a country...'), 'japan')

    await waitFor(() => {
      expect(screen.queryByText('Germany')).not.toBeInTheDocument()
      expect(screen.queryByText('France')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Japan')).toBeInTheDocument()
  })

  it('filters the list when the user selects a region', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CountryListPage />)

    await screen.findByText('Germany')

    await user.selectOptions(screen.getByRole('combobox'), 'Asia')

    expect(screen.getByText('Japan')).toBeInTheDocument()
    expect(screen.queryByText('Germany')).not.toBeInTheDocument()
  })

  it('shows the empty state when filters produce no matches', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CountryListPage />)

    await screen.findByText('Germany')

    await user.type(screen.getByPlaceholderText('Search for a country...'), 'zzz_no_match')

    expect(await screen.findByText('No countries found')).toBeInTheDocument()
  })
})
