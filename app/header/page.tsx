'use client'

import { Button, Input } from 'antd'
import { useState } from 'react'
import { useCopyToClipboard } from 'react-use'

function parseHeaders(str: string): Record<string, string> {
  return Object.fromEntries(str.split('\n').map(headerStr => headerStr.split(': ')))
}

function Item({ label, value }: { label: string; value: string }) {
  const [, copyToClipboard] = useCopyToClipboard()

  if (!label && !value) {
    return null
  }
  return (
    <div className="rounded border border-blue-500 p-4 shadow">
      <div className="flex justify-between">
        <span className="mr-10 w-1/4 text-right font-bold text-blue-500">{label}:</span>
        <span className="flex-1 text-left text-gray-700">{value}</span>
      </div>

      {!!value && (
        <div className="flex justify-end space-x-4 pt-10">
          <Button
            onClick={() => {
              copyToClipboard(value)
            }}
          >
            复制原文
          </Button>
          <Button
            type="primary"
            onClick={() => {
              copyToClipboard(JSON.stringify(value))
            }}
          >
            复制字符串
          </Button>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  const [value, setValue] = useState('')

  const headers = parseHeaders(value)

  return (
    <>
      <div className="p-10">
        <Input.TextArea
          placeholder="请输入 request/response headers"
          className="mb-10"
          allowClear
          autoSize
          value={value}
          onChange={evt => {
            setValue(evt.target.value)
          }}
        />
      </div>

      <div className="space-y-6 break-all p-10">
        <div className="p-2 text-lg font-bold">解析</div>
        {Object.entries(headers).map(([key, value]) => (
          <Item key={key} label={key} value={value} />
        ))}
      </div>
    </>
  )
}
