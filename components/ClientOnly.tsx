import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ClientOnly = dynamic(() => Promise.resolve((props: Props) => <>{props.children}</>), {
  ssr: false,
})

export default ClientOnly
