import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

export function useTheme() {
  const { isDark, toggle } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return { isDark, toggle }
}
