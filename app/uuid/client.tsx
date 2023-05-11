'use client'

import CopyButton from '@/components/CopyButton'
import useUniqList from '@/hooks/useUniqList'
import { SyncOutlined } from '@ant-design/icons'
import { FloatButton, Skeleton } from 'antd'
import { isNumber, toNumber } from 'lodash'
import { useSearchParams } from 'next/navigation'

export default function Client() {
  const searchParams = useSearchParams()

  const num = toNumber(searchParams.get('num')) || 6

  const { data, reset } = useUniqList({ count: num })

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center space-y-6">
      <div className="text-xl font-bold text-gray-700">UUID V4</div>
      <div className="flex flex-wrap justify-center gap-4">
        {data.map(value => (
          <div key={value} className="w-96">
            {isNumber(value) ? <Skeleton.Input block active /> : <CopyButton value={value} />}
          </div>
        ))}
      </div>
      <FloatButton type="primary" icon={<SyncOutlined />} onClick={reset} />
    </div>
  )
}
