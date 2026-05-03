# World Explorer

A small frontend application that lets you browse, search, and explore detailed information about every country in the world. Built with React and TypeScript as part of a technical assessment.

---

## Getting started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

To run the tests:

```bash
npm run test:run
```

---

## Stack

- **React 18 + TypeScript** — strict mode throughout, no `any`
- **Vite** — build tooling and dev server
- **TanStack Query v5** — data fetching, caching, and loading/error states
- **Zustand** — lightweight client state for search, filters, and dark mode
- **React Router v7** — client-side routing
- **Tailwind CSS v4** — utility-first styling with class-based dark mode
- **Axios** — HTTP client
- **Vitest + React Testing Library + MSW** — unit and integration tests

Data comes from the [REST Countries API](https://restcountries.com) — no authentication required.

---

## Project structure

```
src/
├── components/
│   ├── layout/       Header, Layout
│   └── ui/           Badge, SearchInput, Select, EmptyState, ErrorState
├── features/
│   └── countries/
│       ├── api/      API calls
│       ├── components/
│       ├── hooks/    useCountries, useCountry
│       ├── pages/    CountryListPage, CountryDetailPage
│       └── types/
├── hooks/            useDebounce, useTheme
├── lib/              queryClient, httpClient
├── mocks/            MSW handlers and mock data for tests
├── pages/            NotFoundPage
├── store/            filterStore, themeStore
└── test/             setup, render utilities
```

I went with a feature-based layout rather than grouping everything by type (components, hooks, etc.). It keeps each domain self-contained — if the countries feature ever needed to be removed or replaced, it lives in one place.

---

## What it does

- Browse all ~250 countries in a responsive grid
- Search by country name (debounced at 300ms)
- Filter by region
- Live result count — "Showing X of 250"
- Click any country to see its detail page — flag, native name, population, region, sub-region, capital, currencies, languages, and border countries
- Border countries are clickable and navigate to their own detail page
- Skeleton loading states on both the list and detail views
- Error states with a retry button
- Empty state when search/filter returns nothing
- Dark mode toggle, preference persisted to `localStorage`
- 404 page for unmatched routes

---

## Tests

8 test files, 39 tests. Mix of unit tests (stores, hooks) and integration tests (components and pages with MSW intercepting the API).

```bash
npm run test:run        # run once
npm run test            # watch mode
npm run test:coverage   # coverage report
```

---

## Assumptions, trade-offs & AI usage

See [NOTES.md](./NOTES.md).
