# Workspace search / sort / viewmode guidance

This document explains the approach used in this feature: centralizing search, sort, and view mode state using `useReducer` + React Context.

## Why `useReducer` + `useContext`?

- `useReducer` helps keep state changes organized via actions and ensures update logic is centralized and pure (the reducer).
- `useContext` helps provide the state and dispatch to nested components without prop drilling.

## State shape

We store the following in the reducer state:
- `searchQuery: string` — the current search string
- `sortBy: 'az' | 'za' | 'recent' | 'oldest'` — how to sort boards
- `viewMode: 'grid' | 'list'` — how to render boards
- `boards: Board[]` — the raw boards list

The provider computes derived state `boards` as a filtered & sorted array.

## Actions (WorkspaceAction union)

- `SET_SEARCH_QUERY`: string -> update `searchQuery`
- `SET_SORT_BY`: SortOption -> update `sortBy`
- `SET_VIEW_MODE`: ViewMode -> update `viewMode`
- `SET_BOARDS`: Board[] -> update `boards` if external source changes

## Where to compute filtered & sorted boards

- We compute derived state inside the provider using `useMemo`, depending on `state.searchQuery`, `state.sortBy`, and `state.boards`.
- Pros: Centralized computation, consistent behavior across components.
- Cons: The provider re-renders when state changes — to reduce unnecessary renders, ensure components only consume what they need or use memoized value selectors.

## Performance & UX tips

- Debounce the search input to avoid excessive dispatches on every keystroke (e.g., 300ms using `useDebouncedValue` or `useEffect`).
- Keep reducer pure; avoid side effects.
- Consider splitting contexts if only small parts of the state are required by specific components (e.g., `ViewModeContext`).
- For large lists, consider server-side filtering / pagination.

## How components should use it

- Use `const state = useContext(WorkspaceContext)` to read state like `viewMode` or `boards` (computed boards are in `boards`).
- Use `const dispatch = useContext(WorkspaceDispatchContext)` to dispatch actions: `dispatch({ type: 'SET_SORT_BY', payload: 'az' })`.

## How to extend

- Add `SET_SELECTED_BOARD` to highlight or open boards in a detail view.
- Use `localStorage` to persist `viewMode` and `sortBy` across sessions.

## Quick manual test steps

1. Run dev server: `pnpm dev` or `npm run dev`.
2. Open the workspace page and ensure the filter input filters boards in real-time.
3. Change sort options and verify the order.
4. Toggle view mode between grid/list.

## Example: Replace a component that used `setSortBy` helper

Before: a component using a custom `setSortBy` method in the context.

After: use the dispatch directly:

```ts
const dispatch = useContext(WorkspaceDispatchContext);
dispatch({ type: 'SET_SORT_BY', payload: 'az' });
```

This ensures a single pattern of updating state and keeps reducer-driven logic consistent.

---

If you'd like, I can implement:
- Debounced search input using `useDebouncedValue`.
- Persist `viewMode` and `sortBy` to `localStorage`.
- Unit tests for reducer behavior.

Tell me which of the above you'd like next and I will implement it.
