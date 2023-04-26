import Button from '@/components/Button'
import ClientOnly from '@/components/ClientOnly'
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
          <div className="flex flex-wrap gap-2 p-6">
            {list.map(value => {
              return (
                <Button
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
        <button
          className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm text-white"
          onClick={update}
        >
          更新
        </button>
      </div>
    </>
  )
}
