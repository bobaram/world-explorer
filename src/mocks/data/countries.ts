import type { Country } from '@/features/countries/types/country.types'

export const mockCountries: Country[] = [
  {
    name: {
      common: 'Germany',
      official: 'Federal Republic of Germany',
      nativeName: { deu: { official: 'Bundesrepublik Deutschland', common: 'Deutschland' } },
    },
    cca3: 'DEU',
    flags: {
      svg: 'https://flagcdn.com/de.svg',
      png: 'https://flagcdn.com/w320/de.png',
      alt: 'Flag of Germany',
    },
    population: 83240525,
    region: 'Europe',
    subregion: 'Western Europe',
    capital: ['Berlin'],
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { deu: 'German' },
    borders: ['FRA', 'AUT'],
  },
  {
    name: {
      common: 'France',
      official: 'French Republic',
      nativeName: { fra: { official: 'République française', common: 'France' } },
    },
    cca3: 'FRA',
    flags: {
      svg: 'https://flagcdn.com/fr.svg',
      png: 'https://flagcdn.com/w320/fr.png',
      alt: 'Flag of France',
    },
    population: 67391582,
    region: 'Europe',
    subregion: 'Western Europe',
    capital: ['Paris'],
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { fra: 'French' },
    borders: ['DEU', 'ESP'],
  },
  {
    name: {
      common: 'Japan',
      official: 'Japan',
      nativeName: { jpn: { official: '日本', common: '日本' } },
    },
    cca3: 'JPN',
    flags: {
      svg: 'https://flagcdn.com/jp.svg',
      png: 'https://flagcdn.com/w320/jp.png',
      alt: 'Flag of Japan',
    },
    population: 125681593,
    region: 'Asia',
    subregion: 'Eastern Asia',
    capital: ['Tokyo'],
    currencies: { JPY: { name: 'Japanese yen', symbol: '¥' } },
    languages: { jpn: 'Japanese' },
    borders: [],
  },
]
