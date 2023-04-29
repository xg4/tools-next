import { readFileAsText } from '@/utils/file'
import { Table, Tag, Upload, UploadProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { compact, keyBy, uniqBy } from 'lodash'
import Head from 'next/head'
import { useState } from 'react'

interface Line {
  key: string
  date: string
  scope: string
  level: string
  details: string
}

function formatText(text: string): Line[] {
  return compact(text.split('\n'))
    .map(line => line.split(']').map(str => str.slice(1)))
    .map(line => {
      const [date, scope, level, details] = line
      return { key: line.join('|'), date, scope, level, details }
    })
}

type DataType = Line

export default function Vaultwarden() {
  const [lines, setLines] = useState<Line[]>([])
  const levels = keyBy(lines, 'level')
  const scopes = keyBy(lines, 'scope')

  const columns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'details',
    },
    {
      title: '区域',
      dataIndex: 'scope',
      filters: Object.keys(scopes).map(scope => ({
        text: scope,
        value: scope,
      })),
      onFilter(value, record) {
        return record.scope.includes(value.toString())
      },
    },
    {
      title: '错误等级',
      dataIndex: 'level',
      filters: Object.keys(levels).map(level => ({
        text: level,
        value: level,
      })),
      onFilter(value, record) {
        return record.level.includes(value.toString())
      },
      render(value) {
        return (
          <Tag
            className={classNames({
              'border-red-500 bg-red-100/50 text-red-500': value === 'ERROR',
              'border-yellow-500 bg-yellow-100/50 text-yellow-500': value === 'WARN',
            })}
          >
            {value}
          </Tag>
        )
      },
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => dayjs(a.date).diff(b.date),
    },
  ]

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    async onChange({ fileList }) {
      for (const item of fileList) {
        if (!item.originFileObj) {
          return
        }
        const txt = await readFileAsText(item.originFileObj)
        setLines(prev => uniqBy([...formatText(txt), ...prev], 'key'))
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <>
      <Head>
        <title>解析 Vaultwarden 日志内容</title>
      </Head>
      <div className="container mx-auto p-4">
        <Upload.Dragger {...props}>
          <p className="text-gray-900">点击或拖动文件到此区域进行上传</p>
          <p className="text-gray-500">支持单一或批量上传</p>
        </Upload.Dragger>
        <Table className="py-10" columns={columns} dataSource={lines} />;
      </div>
    </>
  )
}
