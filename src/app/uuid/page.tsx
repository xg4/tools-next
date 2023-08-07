import ClientOnly from '@/components/ClientOnly'
import Client from './client'

export default async function Page() {
  return (
    <ClientOnly>
      <Client />
    </ClientOnly>
  )
}
