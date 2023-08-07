import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export default function useCurrentURL() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const existedSearchParams = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams])
  return {
    url: [pathname, searchParams].join('?'),
    setSearchParams: useCallback(
      (params: Record<string, any>) => {
        return [pathname, new URLSearchParams({ ...existedSearchParams, ...params })].join('?')
      },
      [existedSearchParams, pathname],
    ),
  }
}
