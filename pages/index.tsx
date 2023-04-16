import Link from 'next/link'

export default function Home() {
  const links = [
    {
      title: 'uuid v4',
      link: '/uuid',
    },
    {
      title: '随机用户名字符串',
      link: '/username',
    },
    {
      title: '解析请求头信息',
      link: '/header',
    },
  ]
  return (
    <div className="p-10">
      <h3 className="mb-2 text-lg font-bold">工具集：</h3>
      <ul className="space-y-2 pl-6">
        {links.map(item => (
          <li key={item.link} className="text-blue-500 underline">
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
