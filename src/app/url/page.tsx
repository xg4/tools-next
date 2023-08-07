'use client'

import { Typography } from 'antd'
import { produce } from 'immer'
import { isEmpty } from 'lodash'
import { useState } from 'react'

export default function Page() {
  const [params, setParams] = useState<Record<string, string>>({})

  return (
    <>
      <div className="p-10">
        <textarea
          placeholder="请输入 url"
          className="mb-10 h-96 w-full resize-none border border-blue-500 p-2"
          onChange={evt => {
            const url = evt.target.value
            if (url) {
              setParams(Object.fromEntries(new URL(url).searchParams.entries()))
            }
          }}
        ></textarea>
      </div>

      {!isEmpty(params) && (
        <>
          <div className="space-y-6 break-all p-10">
            <div className="p-2 text-lg font-bold">解析 searchParams</div>
            {Object.entries(params).map(([key, value]) => (
              <div key={key} className="rounded border border-blue-500 p-4 shadow">
                <div className="flex justify-between">
                  <span className="mr-10 w-32 text-right font-bold text-blue-500">{key}:</span>
                  <textarea
                    className="flex-1 resize-none border-2 border-transparent text-left text-gray-700 outline-none focus:border-blue-500"
                    value={value}
                    onChange={evt => {
                      setParams(
                        produce(draft => {
                          draft[key] = evt.target.value
                        }),
                      )
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="break-all p-10">
            <div className="text-lg font-bold">结果:</div>
            <Typography.Text code copyable className="font-mono text-sm">
              {new URLSearchParams(params).toString()}
            </Typography.Text>
          </div>
        </>
      )}
    </>
  )
}
