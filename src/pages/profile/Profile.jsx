import { useRef, useState } from 'react'
import imgAvatar from './200_200.png'
import { useStateContext } from '@src/hooks'
import { Divider, Menu, notification } from 'antd'
import { CameraFilled, KeyOutlined, UserOutlined } from '@ant-design/icons'
import Err403 from '../errors/Err403'
import UserInfo from './UserInfo'
import { BACKEND_URL } from '@src/utils/const'
import { changeAvatarApi } from '@src/axios/api'
import ChangePassword from './ChangePassword'

export default function Profile() {
  // use custom hook
  const { state, dispatch } = useStateContext()
  // state
  const [currentMenu, setCurrentMenu] = useState('userinfo')
  // ref
  const avatarInputRef = useRef(null)

  const user = state?.auth?.user

  const items = [
    {
      label: 'Thông tin cá nhân',
      key: 'userinfo',
      icon: <UserOutlined />,
    },
    {
      label: 'Đổi mật khẩu',
      key: 'change-password',
      icon: <KeyOutlined />,
    },
  ]

  const pages = [
    {
      key: 'userinfo',
      content: <UserInfo />,
    },
    {
      key: 'change-password',
      content: <ChangePassword />,
    },
  ]

  const onClick = (e) => {
    setCurrentMenu(e.key)
  }

  // handle change avatar
  const handleClickChangeAvatar = () => {
    avatarInputRef.current.click()
  }

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0]

    if (file) {
      handleSubmitAvatar(file)
    }
  }

  const handleSubmitAvatar = async (file) => {
    console.log(file)

    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const res = await changeAvatarApi(formData)
      location.reload()
      // notification.success({ message: res?.message, placement: 'top' })
    } catch (error) {
      notification.error({ message: error?.response?.data?.message, placement: 'top' })
    }
  }

  //
  if (!state?.auth?.isAuth) return <Err403 />

  return (
    <div>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <img
            className='size-28 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500'
            src={user?.avatar ? `${BACKEND_URL}/public/avatar/${user?.avatar}` : imgAvatar}
            alt='avatar'
          />
          <div className='absolute bottom-0 right-0' onClick={handleClickChangeAvatar}>
            <input
              type='file'
              className='hidden'
              ref={avatarInputRef}
              onChange={handleChangeAvatar}
            />
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
