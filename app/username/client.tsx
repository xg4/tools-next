'use client'

import CopyButton from '@/components/CopyButton'
import useCurrentURL from '@/hooks/useCurrentURL'
import useRafList from '@/hooks/useRafList'
import useUniqList from '@/hooks/useUniqList'
import { SyncOutlined } from '@ant-design/icons'
import { FloatButton, Select, Skeleton } from 'antd'
import { isNull, range, toNumber } from 'lodash'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { v4 } from 'uuid'

const GLOBAL_USERNAME = v4().replaceAll('-', '')

export default function Client() {
  const searchParams = useSearchParams()
  const length = Math.min(toNumber(searchParams.get('length')) || 4, GLOBAL_USERNAME.length - 1)
  const num = toNumber(searchParams.get('num')) || 40

  const generate = useCallback(() => v4().replaceAll('-', '').slice(0, length), [length])
  const { data: _data, reset } = useUniqList({ count: num, generate })
  const { data } = useRafList(_data)
  const { setSearchParams } = useCurrentURL()
  const router = useRouter()
  const setLength = useCallback(
    (length: number) => {
      router.replace(setSearchParams({ length }))
    },
    [router, setSearchParams],
  )
  return (
    <>
      <div className="fixed left-0 top-0 z-10 flex w-full items-center bg-white/90 p-6 shadow-xl">
        <div className="text-left text-lg font-bold">用户名长度：</div>
        <Select value={length} onChange={setLength}>
          {range(1, GLOBAL_USERNAME.length).map(num => (
            <Select.Option value={num} key={num}>
              {num}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 pt-28">
        <div className="text-xl font-bold text-gray-700">
          用户名 <span className="text-base font-normal text-gray-400">({length}位)</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {data.map(({ value: text }, index) => {
            if (isNull(text)) {
              return <Skeleton.Button active key={index} />
            }
            return <CopyButton key={[text, index].join('|')} value={text} />
          })}
        </div>
        <FloatButton type="primary" icon={<SyncOutlined />} onClick={reset} />
      </div>
    </>
  )
}
