import { useStateContext } from '@src/hooks'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'

export default function UserInfo() {
  const { state } = useStateContext()
  const user = state?.auth?.user
  const [email] = useState(user?.email)

  const onFinish = (values) => {
    delete values['email']
    console.log('Success:', values)
  }

  return (
    <Form name='update-profile' onFinish={onFinish} autoComplete='off' layout='vertical'>
      <Form.Item label='Email' name='email'>
        <Input placeholder={email} disabled />
      </Form.Item>

      <Form.Item
        label='Họ'
        name='firstName'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập họ của bạn!',
          },
        ]}
      >
        <Input placeholder={user.firstName} value={user.firstName} />
      </Form.Item>

      <Form.Item
        label='Tên'
        name='lastName'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên của bạn!',
          },
        ]}
      >
        <Input placeholder={user.lastName} value={user.lastName} />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Chỉnh sửa thông tin cá nhân
        </Button>
      </Form.Item>
    </Form>
  )
}
