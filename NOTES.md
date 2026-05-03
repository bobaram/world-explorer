# Notes

## Assumptions & trade-offs

**Single API call for everything**

Rather than fetching a trimmed list and making a separate per-country request for the detail view, I fetch all needed fields in one `/all` call upfront. The payload is around 200KB and TanStack Query caches it for 10 minutes. Navigating from the list to a detail page costs zero additional requests — `useCountry` shares the same query key as `useCountries` so it reads straight from cache.

One thing I ran into: the REST Countries API has an undocumented 10-field limit on the `fields` parameter. It returns a 400 with no useful message. I found it by testing field combinations one at a time and dropped `tld` (top-level domain) to bring the count to 10. It is the least user-facing of the detail fields so it was the obvious one to cut.

**Filters in Zustand, not the URL**

Search and region filter state lives in a Zustand store. The trade-off is that filter state is lost on hard refresh and you can't share a filtered URL. For a production app I would move this to `useSearchParams` so the browser history and shareable links work correctly. For a browsing interface of this scope, Zustand keeps things clean without the overhead.

**No pagination**

250 countries is small enough that client-side filtering on a single cached response is faster and simpler than paginating or server-side searching. If the dataset were larger this decision would need revisiting.

**Tailwind v4**

Vite pulled the latest Tailwind (v4) rather than v3. The configuration model changed significantly — no `tailwind.config.ts`, dark mode is set up as a CSS custom variant instead of a config flag. I handled this with `@custom-variant dark (&:where(.dark, .dark *))` in the CSS entry point. It is equivalent to v3's `darkMode: 'class'` but the setup took some reading to get right.

**React Query Devtools**

Included in development. In a real deployment I would gate it behind `import.meta.env.DEV` so it does not ship to production.

---

## AI usage disclosure

**Tool used:** Claude Code CLI (Anthropic).

**Where it helped:**

- Scaffolding repetitive files — things like the skeleton placeholder markup, mock data objects, and boilerplate component structure that followed a pattern already established in design file.
- Tailwind class composition — once the visual pattern was decided, Claude was useful for generating the matching `dark:` variants consistently across components.
- Test file scaffolding — the initial structure of test files, MSW handler setup, and the `renderWithProviders` utility wrapper.

**What I directed and verified:**

- All architecture decisions — the feature-based folder structure, pairing TanStack Query with Zustand, and the choice to do a single `/all` fetch and resolve detail from cache rather than hitting a separate endpoint.
- The caching model — the insight that `useCountry` could share `COUNTRIES_QUERY_KEY` with `useCountries` and avoid a second network request was a deliberate design decision, not something generated.
- Debugging the 400 from the REST Countries API — Claude did not know about the undocumented 10-field limit. I found it by testing field combinations one at a time in the network tab, then made the call to drop `tld`.
- Tailwind v4 setup — the `@custom-variant dark` directive required reading the v4 migration docs. The initial generated output was incorrect and I corrected it.
- Every generated file was reviewed before use. Component logic, conditional rendering, and accessibility attributes were written and adjusted by hand.

**Output I did not use:**

- A suggested `ThemeProvider` context component — Zustand's persist middleware handles this without the extra wrapper.
- URL param syncing for filters — Claude suggested it, I decided against it for this scope and kept filters in Zustand.
- A `useReducer` approach for filter state — unnecessary complexity for two fields.
