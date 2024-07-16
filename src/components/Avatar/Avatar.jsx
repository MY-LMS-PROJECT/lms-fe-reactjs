import { UserOutlined } from '@ant-design/icons'
import { useStateContext } from '@src/hooks'
import { Avatar as AvatarImg, List } from 'antd'
import { Link } from 'react-router-dom'

export const Avatar = () => {
  const { state } = useStateContext()
  const data = [
    {
      key: 'profile',
      href: '/profile',
      content: 'Cá nhân',
    },
    {
      key: 'logout',
      href: '/auth/logout',
      content: 'Đăng xuất',
    },
  ]

  return (
    <div className='group relative'>
      <AvatarImg className='bg-green-500' icon={<UserOutlined />} size={'large'} />
      <div className='absolute right-0 top-full hidden pt-3 group-hover:block'>
        <List
          className='bg-white'
          bordered
          header={<b>{`${state.auth.user.firstName} ${state.auth.user.lastName}`}</b>}
          dataSource={data}
          renderItem={(item) => (
            <Link key={item.key} to={item.href} className='overflow-hidden'>
              <List.Item className='hover:bg-gray-100'>
                <div className='w-36 min-w-36 cursor-pointer'>{item.content}</div>
              </List.Item>
            </Link>
          )}
        />
      </div>
    </div>
  )
}
