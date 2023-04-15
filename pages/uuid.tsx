import ClientOnly from '@/components/ClientOnly'
import { range } from 'lodash'
import Head from 'next/head'
import { useUpdate } from 'react-use'
import { v4 } from 'uuid'

export default function Uuid() {
  const update = useUpdate()
  return (
    <>
      <Head>
        <title>uuid生成</title>
      </Head>
      <div className="flex flex-col items-center justify-center p-10 font-mono">
        <ClientOnly>
          <div className="space-y-4 p-6">
            {range(4).map(() => {
              const uuidV4 = v4()
              return (
                <div className="border border-blue-500 p-4" key={uuidV4}>
                  {uuidV4}
                </div>
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
