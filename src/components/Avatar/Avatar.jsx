import { UserOutlined } from '@ant-design/icons'
import { useStateContext } from '@src/hooks'
import { Avatar as AvatarImg, List } from 'antd'
import { Link } from 'react-router-dom'

export const Avatar = () => {
  const { state } = useStateContext()
  const data = ['Cá nhân', 'Đăng xuất']

  return (
    <div className='relative'>
      <AvatarImg className='bg-green-500' icon={<UserOutlined />} />
      <div className='absolute right-0 top-full pt-3'>
        <List
          className='bg-white'
          bordered
          header={<b>{`${state.auth.user.firstName} ${state.auth.user.lastName}`}</b>}
          dataSource={data}
          renderItem={(item) => (
            <Link to='/auth/logout'>
              <List.Item>
                <div className='w-36 min-w-36 cursor-pointer'>{item}</div>
              </List.Item>
            </Link>
          )}
        />
      </div>
    </div>
  )
}
