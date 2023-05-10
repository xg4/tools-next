import '@/styles/globals.css'
import 'antd/dist/reset.css'
import Providers from './providers'

export const metadata = {
  title: '工具集合',
  description: '工具集合',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-cn">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  )
}
