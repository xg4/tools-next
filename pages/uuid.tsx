import ClientOnly from '@/components/ClientOnly'
import { Button } from 'antd'
import dayjs from 'dayjs'
import { times, toNumber } from 'lodash'
import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { useCopyToClipboard } from 'react-use'
import { v4 } from 'uuid'

export default function Uuid() {
  const searchParams = useSearchParams()
  const num = toNumber(searchParams.get('num')) || 9

  const [, copy] = useCopyToClipboard()

  const [now, setNow] = useState(dayjs().unix())

  const list = useMemo(() => times(num, () => v4()), [num, now])

  const update = useCallback(() => {
    setNow(dayjs().unix())
  }, [])

  return (
    <>
      <Head>
        <title>uuid生成</title>
      </Head>
      <div className="flex flex-col items-center justify-center p-10 font-mono">
        <ClientOnly>
          <div className="flex flex-wrap justify-center gap-4 p-6">
            {list.map(value => {
              return (
                <Button
                  className="font-mono text-base"
                  key={value}
                  onClick={() => {
                    copy(value)
                  }}
                >
                  {value}
                </Button>
              )
            })}
          </div>
        </ClientOnly>
        <Button type="primary" onClick={update}>
          更新
        </Button>
      </div>
    </>
  )
}
