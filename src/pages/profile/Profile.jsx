import { useEffect, useState } from 'react'
import imgAvatar from './200_200.png'
import { useStateContext } from '@src/hooks'
import { getProfileAction } from '../auth/authAction'
import { Divider, Menu } from 'antd'
import { Navigate } from 'react-router-dom'
import { CameraFilled, CameraOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'

export default function Profile() {
  const { state, dispatch } = useStateContext()
  const [currentMenu, setCurrentMenu] = useState('mail')

  const user = state?.auth?.user

  const items = [
    {
      label: 'Navigation One',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: 'Navigation One',
      key: 'mail2',
      icon: <MailOutlined />,
    },
  ]

  const onClick = (e) => {
    setCurrentMenu(e.key)
  }

  if (!state?.auth?.isAuth) return <Navigate to={'/auth/login'} />

  return (
    <div>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <img
            className='size-28 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500'
            src={user?.avatar ?? imgAvatar}
            alt='avatar'
          />
          <div className='absolute bottom-0 right-0'>
            <CameraFilled className='text-3xl' />
          </div>
        </div>
        <div className=''>
          <h2>{`${user?.firstName} ${user?.lastName}`}</h2>
          <p>a b c d e</p>
        </div>
      </div>
      <Divider />
      <Menu onClick={onClick} selectedKeys={[currentMenu]} mode='horizontal' items={items} />
      <div>1</div>
      <div>2</div>
    </div>
  )
}
