import { changePasswordApi } from '@src/axios/api'
import { Button, Form, Input, notification } from 'antd'
import {} from 'react'

export default function ChangePassword() {
  const onFinish = async (values) => {
    console.log(values)
    try {
      const res = await changePasswordApi(values)
      console.log(res)
      notification.success({
        placement: 'top',
        message: res?.message,
      })
    } catch (error) {
      let errMsg = error.response?.data?.message // string or array

      if (Array.isArray(errMsg) && errMsg.length > 0) {
        let _errMsg = errMsg.reduce((preValue, currentValue) => {
          return preValue + `${currentValue.field}: ${currentValue.error}, `
        }, '')
        errMsg = _errMsg
      }

      notification.error({
        message: 'Đăng nhập thất bại',
        description: errMsg,
      })
    }
  }

  return (
    <Form name='change-password' onFinish={onFinish} autoComplete='off' layout='vertical'>
      <Form.Item
        label='Mật khẩu hiện tại'
        name='password'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label='Mật khẩu mới'
        name='newPassword'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Đổi mật khẩu
        </Button>
      </Form.Item>
    </Form>
  )
}
