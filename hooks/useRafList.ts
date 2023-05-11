import { produce } from 'immer'
import { times } from 'lodash'
import { useEffect, useRef, useState } from 'react'

interface RafData<T> {
  value: T | null
}

export default function useRafList<T>(sourceData: T[]) {
  const [loading, setLoading] = useState(false)
  const [rafData, setRafData] = useState<RafData<T>[]>([])

  const frame = useRef(0)

  useEffect(() => {
    const emptyList = times(sourceData.length, () => ({ value: null }))
    setRafData(emptyList)
    setLoading(true)
    cancelAnimationFrame(frame.current)
    const update = (index = 0) => {
      if (index >= sourceData.length) {
        setLoading(false)
        return
      }

      setRafData(
        produce(draft => {
          Object.assign(draft[index], { value: sourceData[index] })
        }),
      )
      frame.current = requestAnimationFrame(() => update(index + 1))
    }

    update()

    return () => {
      cancelAnimationFrame(frame.current)
    }
  }, [sourceData])

  return {
    data: rafData,
    loading,
  }
}
