import { updateProfile } from '@src/axios/api'
import { useStateContext } from '@src/hooks'
import { Button, Form, Input, notification } from 'antd'
import { useEffect, useState } from 'react'

export default function UserInfo() {
  const { state } = useStateContext()
  const user = state?.auth?.user
  const [email] = useState(user?.email)

  const onFinish = async (values) => {
    delete values['email']

    try {
      await updateProfile(values)
      location.reload()
    } catch (error) {
      let errMsg = error.response?.data?.message // string or array

      if (Array.isArray(errMsg) && errMsg.length > 0) {
        // errMsg = [{ field: '', error: '' }]
        console.log('message arr', errMsg)
        let _errMsg = errMsg.reduce((preValue, currentValue) => {
          return preValue + `${currentValue.field}: ${currentValue.error}, `
        }, '')
        errMsg = _errMsg
      }

      notification.error({
        message: 'Cập nhật thất bại',
        description: errMsg,
      })
    }
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
        <Input placeholder={user.firstName} />
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
        <Input placeholder={user.lastName} />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Chỉnh sửa thông tin cá nhân
        </Button>
      </Form.Item>
    </Form>
  )
}
