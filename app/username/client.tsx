'use client'

import CopyButton from '@/components/CopyButton'
import useCurrentURL from '@/hooks/useCurrentURL'
import { generateUsername, globalUsername } from '@/utils/user'
import { Button, Select } from 'antd'
import dayjs from 'dayjs'
import { range, times, toNumber, uniq } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

export default function Client() {
  const searchParams = useSearchParams()
  const length = Math.min(toNumber(searchParams.get('length')) || 4, globalUsername.length - 1)
  const num = toNumber(searchParams.get('num')) || 50

  const { setSearchParams } = useCurrentURL()
  const router = useRouter()
  const setLength = useCallback(
    (length: number) => {
      router.replace(setSearchParams({ length }))
    },
    [router, setSearchParams],
  )

  const [now, setNow] = useState(dayjs().unix())
  const update = useCallback(() => {
    setNow(dayjs().unix())
  }, [])

  const v4List = useMemo(() => uniq(times(num, () => generateUsername(length))), [length, num, now])

  return (
    <div className="flex flex-col items-center justify-center p-10 font-mono">
      <div className="w-full pt-10">
        <span className="text-left text-lg font-bold">字符串长度：</span>
        <Select value={length} onChange={setLength}>
          {range(1, globalUsername.length).map(num => (
            <Select.Option value={num} key={num}>
              {num}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="w-full pt-10 text-left text-lg font-bold">随机列表：</div>
      <div className="flex flex-wrap gap-4 p-6">
        {v4List.map(username => (
          <CopyButton key={username} value={username} />
        ))}
      </div>
      <Button type="primary" onClick={update}>
        更新
      </Button>
    </div>
  )
}
