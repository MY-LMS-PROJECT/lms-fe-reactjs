import { Link } from 'react-router-dom'
import { Button, List } from 'antd'
import canvasLogo from './canvas-logo.svg'
import { Avatar } from '../Avatar/Avatar'
import { useStateContext } from '@src/hooks'
import { MenuOutlined } from '@ant-design/icons'
import { UserRole } from '@src/utils/UserRole'

export const Header = () => {
  const { state } = useStateContext()

  const roleId = state?.auth?.user?.role?.id

  const data = [
    ...(UserRole.TEACHER === roleId
      ? [
          {
            key: 'create-course',
            href: '/courses/create',
            content: 'Tạo lớp học',
          },
          {
            key: 'manage-course',
            href: '/courses/manage',
            content: 'Quản lý lớp học',
          },
        ]
      : []),

    {
      key: 'courses',
      href: '#',
      content: 'Lớp học',
    },
  ]

  return (
    <>
      <header className='fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between bg-white px-16 shadow'>
        <div className='flex items-center gap-4'>
          <div className='h-7'>
            <Link to={'/'}>
              <img src={canvasLogo} alt='' className='h-full' />
            </Link>
          </div>
          <div className='group relative cursor-pointer'>
            <div className='flex h-10 items-center gap-2'>
              <MenuOutlined /> Menu
            </div>
            <div className='absolute left-0 top-full z-10 hidden pt-3 group-hover:block'>
              <List
                className='bg-white'
                bordered
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
        </div>
        <div className='flex items-center'>
          {state.auth.isAuth ? (
            <Avatar />
          ) : (
            <div className='flex gap-3'>
              <Link to={'/auth/login'}>
                <Button>Đăng nhập</Button>
              </Link>
              <Link to={'/auth/signup'}>
                <Button className=''>Đăng ký</Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
