import { useState } from 'react'
import imgAvatar from './200_200.png'
import { useStateContext } from '@src/hooks'
import { Divider, Menu } from 'antd'
import { CameraFilled, UserOutlined } from '@ant-design/icons'
import Err403 from '../errors/Err403'
import UserInfo from './UserInfo'

export default function Profile() {
  const { state, dispatch } = useStateContext()
  const [currentMenu, setCurrentMenu] = useState('userinfo')

  const user = state?.auth?.user

  const items = [
    {
      label: 'Thông tin cá nhân',
      key: 'userinfo',
      icon: <UserOutlined />,
    },
  ]

  const pages = [
    {
      key: 'userinfo',
      content: <UserInfo />,
    },
    {
      key: 'otherpage',
      content: 'Other info',
    },
  ]

  const onClick = (e) => {
    setCurrentMenu(e.key)
  }

  if (!state?.auth?.isAuth) return <Err403 />

  return (
    <div>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <img
            className='size-28 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500'
            src={user?.avatar ? `http://localhost:8000/public/avatar/${user?.avatar}` : imgAvatar}
            alt='avatar'
          />
          <div className='absolute bottom-0 right-0'>
            <CameraFilled className='text-3xl' />
          </div>
        </div>
        <div className=''>
          <h2>{`${user?.firstName} ${user?.lastName}`}</h2>
          <p>Mô tả cá nhân</p>
        </div>
      </div>
      <Divider />
      <Menu onClick={onClick} selectedKeys={[currentMenu]} mode='horizontal' items={items} />
      <div className='mt-8'>
        {Array.isArray(pages) &&
          pages.length > 0 &&
          pages.map((page) => {
            if (page.key === currentMenu) return <div key={page.key}>{page.content}</div>
          })}
      </div>
    </div>
  )
}
