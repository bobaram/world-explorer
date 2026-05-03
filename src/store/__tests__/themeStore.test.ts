import { describe, it, expect, beforeEach } from 'vitest'
import { useThemeStore } from '@/store/themeStore'

describe('themeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ isDark: false })
    localStorage.clear()
  })

  it('defaults to light mode', () => {
    expect(useThemeStore.getState().isDark).toBe(false)
  })

  it('toggles to dark mode', () => {
    useThemeStore.getState().toggle()
    expect(useThemeStore.getState().isDark).toBe(true)
  })

  it('toggles back to light mode', () => {
    useThemeStore.getState().toggle()
    useThemeStore.getState().toggle()
    expect(useThemeStore.getState().isDark).toBe(false)
  })

  it('persists the theme preference to localStorage', () => {
    useThemeStore.getState().toggle()
    const stored = JSON.parse(localStorage.getItem('we-theme') ?? '{}')
    expect(stored.state.isDark).toBe(true)
  })
})
