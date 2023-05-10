'use client'

import CopyButton from '@/components/CopyButton'
import { Button } from 'antd'
import dayjs from 'dayjs'
import { times, toNumber } from 'lodash'
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { v4 } from 'uuid'

function generateUuidList(num: number) {
  return times(num, () => v4())
}

export default function Client() {
  const searchParams = useSearchParams()

  const num = toNumber(searchParams.get('num')) || 9

  const [now, setNow] = useState(dayjs().unix())

  const list: string[] = useMemo(() => generateUuidList(num), [num, now])

  const update = useCallback(() => {
    setNow(dayjs().unix())
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-10 font-mono">
      <div className="flex flex-wrap justify-center gap-4 p-6">
        {list.map(value => (
          <CopyButton key={value} value={value} />
        ))}
      </div>
      <Button type="primary" onClick={update}>
        更新
      </Button>
    </div>
  )
}
