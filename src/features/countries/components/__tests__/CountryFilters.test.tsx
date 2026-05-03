import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CountryFilters } from '@/features/countries/components/CountryFilters'
import { renderWithProviders } from '@/test/utils'
import { useFilterStore } from '@/store/filterStore'

describe('CountryFilters', () => {
  beforeEach(() => useFilterStore.getState().reset())

  it('renders the search input and region select', () => {
    renderWithProviders(<CountryFilters />)

    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('updates the search store when the user types', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CountryFilters />)

    await user.type(screen.getByPlaceholderText('Search for a country...'), 'France')

    expect(useFilterStore.getState().search).toBe('France')
  })

  it('updates the region store when the user selects a region', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CountryFilters />)

    await user.selectOptions(screen.getByRole('combobox'), 'Europe')

    expect(useFilterStore.getState().region).toBe('Europe')
  })

  it('clears the region when the placeholder option is selected', async () => {
    const user = userEvent.setup()
    useFilterStore.getState().setRegion('Asia')
    renderWithProviders(<CountryFilters />)

    await user.selectOptions(screen.getByRole('combobox'), '')

    expect(useFilterStore.getState().region).toBe('')
  })
})
