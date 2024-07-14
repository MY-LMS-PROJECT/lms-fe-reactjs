import { Button, Checkbox, Col, Divider, Form, Input, notification, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

export default function LogIn() {
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      // const { email, password } = values
      // const res = await loginApi({ email, password })
      // if (res) {
      //   localStorage.setItem('accessToken', res?.accessToken)
      //   // setAuth({
      //   //   isAuthenticated: true,
      //   //   user: { name: res.user.name, email: res.user.email },
      //   // })
      //   notification.success({ message: 'Đăng nhập thành công' })
      //   navigate('/')
      // }
    } catch (error) {
      notification.error({
        message: error.response.data.message || 'Email hoặc mật khẩu chưa chính xác',
      })
    }
  }

  return (
    <Row justify={'center'} style={{ marginTop: '30px' }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: '15px',
            margin: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <legend>Đăng Nhập</legend>
          <Form name='basic' onFinish={onFinish} autoComplete='off' layout='vertical'>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name='remember' valuePropName='checked'>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link to={'/'}>
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            Chưa có tài khoản? <Link to={'/auth/signup'}>Đăng ký tại đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  )
}
