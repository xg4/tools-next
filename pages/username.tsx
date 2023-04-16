import ClientOnly from '@/components/ClientOnly'
import classNames from 'classnames'
import dayjs from 'dayjs'
import produce from 'immer'
import { range } from 'lodash'
import Head from 'next/head'
import { useCallback, useMemo, useState } from 'react'
import { useCopyToClipboard } from 'react-use'
import { v4 } from 'uuid'

function Item({ username, className, onClick }: { username: string; className?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={classNames('border border-blue-500 p-4 shadow-lg', className)}>
      {username}
    </button>
  )
}

export default function Uuid() {
  const [length, setLength] = useState(4)
  const [now, setNow] = useState(dayjs().unix())
  const update = useCallback(() => {
    setNow(dayjs().unix())
  }, [])

  const [list, setList] = useState<string[]>([])

  const v4List = useMemo(() => range(50).map(() => v4()), [now])
  const displayList = v4List.map(i => i.replaceAll('-', '').slice(0, length))

  const [, copyToClipboard] = useCopyToClipboard()

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
            {v4()
              .replaceAll('-', '')
              .split('')
              .map((_, index) => (
                <option value={index + 1} key={index}>
                  {index + 1}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full pt-10 text-left text-lg font-bold">随机列表：</div>
        <ClientOnly>
          <div className="flex flex-wrap gap-4 p-6">
            {displayList.map((username, index) => {
              return (
                <Item
                  className={classNames({
                    'bg-blue-500 text-white': list.includes(username),
                  })}
                  onClick={() => {
                    setList(
                      produce(draft => {
                        if (!draft.includes(username)) {
                          draft.push(username)
                        }
                      }),
                    )
                  }}
                  key={index}
                  username={username}
                />
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
        <div className="w-full pt-10 text-left text-lg font-bold">已选择：</div>
        <div className="flex flex-wrap gap-4 p-6">
          {list.map(username => {
            return <Item key={username} username={username} onClick={() => copyToClipboard(username)} />
          })}
        </div>
      </div>
    </>
  )
}
