import Link from 'next/link'

export default function Page() {
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
    {
      title: '解析 URL 参数',
      link: '/url',
    },
    {
      title: '解析 Vaultwarden 日志内容',
      link: '/vaultwarden',
    },
  ]
  return (
    <div className="p-10">
      <h3 className="mb-2 text-lg font-bold">工具集：</h3>
      <div className="mb-2 text-sm text-gray-500">所有工具均可离线使用，无接口请求，保护隐私</div>
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
