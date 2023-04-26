import Button from '@/components/Button'
import ClientOnly from '@/components/ClientOnly'
import { generateUsername, globalUsername } from '@/utils/user'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { produce } from 'immer'
import { parseInt, range, times, toNumber, uniq } from 'lodash'
import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useCopyToClipboard } from 'react-use'

export default function Username() {
  const searchParams = useSearchParams()
  const length = Math.min(toNumber(searchParams.get('length')) || 4, globalUsername.length - 1)
  const num = toNumber(searchParams.get('num')) || 50

  const router = useRouter()
  const setLength = useCallback(
    (len: number) => {
      router.replace({
        query: {
          ...router.query,
          length: len,
        },
      })
    },
    [router],
  )

  const [now, setNow] = useState(dayjs().unix())
  const update = useCallback(() => {
    setNow(dayjs().unix())
  }, [])

  const [list, setList] = useState<string[]>([])

  const v4List = useMemo(() => uniq(times(num, () => generateUsername(length))), [length, num, now])

  const [, copy] = useCopyToClipboard()

  return (
    <>
      <Head>
        <title>用户名随机生成</title>
      </Head>
      <div className="flex flex-col items-center justify-center p-10 font-mono">
        <div className="w-full pt-10">
          <span className="text-left text-lg font-bold">字符串长度：</span>
          <select
            value={length}
            onChange={evt => {
              setLength(parseInt(evt.target.value))
            }}
          >
            {range(1, globalUsername.length).map(num => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full pt-10 text-left text-lg font-bold">随机列表：</div>
        <ClientOnly>
          <div className="flex flex-wrap gap-4 p-6">
            {v4List.map(username => {
              return (
                <Button
                  className={classNames({
                    'bg-blue-500 text-white': list.includes(username),
                  })}
                  onClick={() => {
                    copy(username)
                    setList(
                      produce(draft => {
                        if (!draft.includes(username)) {
                          draft.push(username)
                        }
                      }),
                    )
                  }}
                  key={username}
                >
                  {username}
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
        {list.length ? (
          <>
            <div className="w-full pt-10 text-left text-lg font-bold">已选择：</div>
            <div className="flex flex-wrap gap-4 p-6">
              {list.map(username => (
                <Button key={username} onClick={() => copy(username)}>
                  {username}
                </Button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}
