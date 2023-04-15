import { ClipboardDocumentIcon, ClipboardIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
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
          <button
            onClick={() => {
              copyToClipboard(value)
            }}
            className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm text-white"
          >
            复制原文
            <ClipboardIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              copyToClipboard(JSON.stringify(value))
            }}
            className="flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white"
          >
            复制字符串
            <ClipboardDocumentIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [value, setValue] = useState('')

  const headers = parseHeaders(value)

  return (
    <>
      <Head>
        <title>解析 headers</title>
      </Head>

      <div className="p-10">
        <textarea
          placeholder="请输入 request/response headers"
          className="mb-10 h-96 w-full resize-none border border-blue-500 p-2"
          value={value}
          onChange={evt => {
            setValue(evt.target.value)
          }}
        ></textarea>
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
