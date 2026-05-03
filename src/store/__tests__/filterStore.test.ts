import { describe, it, expect, beforeEach } from 'vitest'
import { useFilterStore } from '@/store/filterStore'

describe('filterStore', () => {
  beforeEach(() => useFilterStore.getState().reset())

  it('has empty defaults', () => {
    const { search, region } = useFilterStore.getState()
    expect(search).toBe('')
    expect(region).toBe('')
  })

  it('sets search value', () => {
    useFilterStore.getState().setSearch('Germany')
    expect(useFilterStore.getState().search).toBe('Germany')
  })

  it('sets region value', () => {
    useFilterStore.getState().setRegion('Europe')
    expect(useFilterStore.getState().region).toBe('Europe')
  })

  it('resets both fields to empty strings', () => {
    useFilterStore.getState().setSearch('Japan')
    useFilterStore.getState().setRegion('Asia')

    useFilterStore.getState().reset()

    const { search, region } = useFilterStore.getState()
    expect(search).toBe('')
    expect(region).toBe('')
  })
})
