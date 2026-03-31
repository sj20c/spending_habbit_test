export async function fetcher<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    cache: 'no-store',
  })
  if (!res.ok) {
    const message = await res.text().catch(() => 'Request failed')
    throw new Error(message || 'Request failed')
  }
  return res.json() as Promise<T>
}
