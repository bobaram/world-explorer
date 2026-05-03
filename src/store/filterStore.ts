import { create } from 'zustand'

interface FilterState {
  search: string
  region: string
  setSearch: (search: string) => void
  setRegion: (region: string) => void
  reset: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  search: '',
  region: '',
  setSearch: (search) => set({ search }),
  setRegion: (region) => set({ region }),
  reset: () => set({ search: '', region: '' }),
}))
