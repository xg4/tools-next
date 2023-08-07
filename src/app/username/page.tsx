import ClientOnly from '@/components/ClientOnly'
import Client from './client'

export default function Page() {
  return (
    <ClientOnly>
      <Client />
    </ClientOnly>
  )
}
