import { produce } from 'immer'
import { range } from 'lodash'
import { useCallback, useRef, useState } from 'react'
import { useMount, useUnmount, useUpdateEffect } from 'react-use'
import { v4 } from 'uuid'

export default function useUniqList({ count, generate = v4 }: { count: number; generate?: () => string }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<(string | number)[]>([])

  const frame = useRef(0)

  const update = useCallback(
    (index = 0) => {
      if (index >= count) {
        setLoading(false)
        return
      }

      setData(
        produce(draft => {
          if (draft) {
            draft[index] = generate()
          }
        }),
      )
      frame.current = requestAnimationFrame(() => update(index + 1))
    },
    [count, generate],
  )

  useUnmount(() => {
    cancelAnimationFrame(frame.current)
  })

  const reset = useCallback(() => {
    const emptyList = range(count)
    setData(emptyList)
    setLoading(true)
    cancelAnimationFrame(frame.current)
    update()
  }, [count, update])

  useUpdateEffect(() => {
    reset()
  }, [generate])

  useMount(reset)

  return {
    data,
    reset,
    loading,
  }
}
