import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'

const ClientOnly = dynamic(() => Promise.resolve((props: PropsWithChildren) => <>{props.children}</>), {
  ssr: false,
})

export default ClientOnly
