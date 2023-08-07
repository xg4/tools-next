import { times } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { v4 } from 'uuid'

export default function useUniqList({ count, generate = v4 }: { count: number; generate?: () => string }) {
  const [data, setData] = useState<string[]>([])

  const reset = useCallback(() => {
    setData(times(count, generate))
  }, [count, generate])

  useEffect(() => {
    setData(times(count, generate))
  }, [count, generate])

  return {
    data,
    reset,
  }
}
