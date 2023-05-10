'use client'

import { Button, message } from 'antd'
import { memo, useCallback } from 'react'
import { useCopyToClipboard, useUpdateEffect } from 'react-use'

function CopyButton({ value }: { value: string }) {
  const [state, copy] = useCopyToClipboard()

  useUpdateEffect(() => {
    if (state.error) {
      message.error('复制失败，请手动复制')
      return
    }
    if (state.value) {
      message.success('复制成功')
      return
    }
  }, [state])

  const onCopy = useCallback(() => {
    copy(value)
  }, [copy, value])

  return (
    <Button className="font-mono text-base" type={!!state.value ? 'primary' : 'default'} onClick={onCopy}>
      {value}
    </Button>
  )
}

export default memo(CopyButton)
