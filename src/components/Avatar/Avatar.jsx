import { UserOutlined } from '@ant-design/icons'
import { Avatar as AvatarImg, List } from 'antd'

export const Avatar = () => {
  const data = ['Cá nhân', 'Đăng xuất']

  return (
    <div className='relative'>
      <AvatarImg className='bg-green-500' icon={<UserOutlined />} />
      <div className='absolute right-0 top-full pt-3'>
        <List
          className='bg-white'
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <div className='w-36 min-w-36 cursor-pointer'>{item}</div>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
