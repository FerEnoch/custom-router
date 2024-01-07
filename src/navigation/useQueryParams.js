export function useQueryParams ({ request } = {}) {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    const { query } = request
    return query
  }

  const search = window.location.search
  const params = new URLSearchParams(search)
  return Object.fromEntries(params.entries())
}
