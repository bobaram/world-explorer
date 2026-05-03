import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { CountryCard } from '@/features/countries/components/CountryCard'
import { renderWithProviders } from '@/test/utils'
import { mockCountries } from '@/mocks/data/countries'

const germany = mockCountries[0]

describe('CountryCard', () => {
  it('renders the country name, population, region, and capital', () => {
    renderWithProviders(<CountryCard country={germany} />)

    expect(screen.getByText('Germany')).toBeInTheDocument()
    expect(screen.getByText('83,240,525')).toBeInTheDocument()
    expect(screen.getByText('Europe')).toBeInTheDocument()
    expect(screen.getByText('Berlin')).toBeInTheDocument()
  })

  it('renders the flag with descriptive alt text', () => {
    renderWithProviders(<CountryCard country={germany} />)

    const flag = screen.getByRole('img', { name: 'Flag of Germany' })
    expect(flag).toBeInTheDocument()
    expect(flag).toHaveAttribute('src', germany.flags.svg)
  })

  it('falls back to a generated alt text when the API provides none', () => {
    const withoutAlt = { ...germany, flags: { ...germany.flags, alt: undefined } }
    renderWithProviders(<CountryCard country={withoutAlt} />)

    expect(screen.getByRole('img', { name: 'Flag of Germany' })).toBeInTheDocument()
  })

  it('displays an em dash when the capital is absent', () => {
    const withoutCapital = { ...germany, capital: undefined }
    renderWithProviders(<CountryCard country={withoutCapital} />)

    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('is keyboard accessible via Enter key', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CountryCard country={germany} />)

    const card = screen.getByRole('button')
    card.focus()
    await user.keyboard('{Enter}')
  })
})
