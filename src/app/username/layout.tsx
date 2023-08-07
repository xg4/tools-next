import { PropsWithChildren } from 'react'

export const metadata = {
  title: '用户名随机生成',
  description: '工具集合',
}

export default function Layout(props: PropsWithChildren) {
  return <>{props.children}</>
}
