import { Button, Checkbox, Col, Divider, Form, Input, notification, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

export default function SignUp() {
  const navigate = useNavigate()

  const onFinish = async (values) => {
    // const { name, email, password } = values;
    // const res = await signupApi({ name, email, password });
    // if (res) {
    //   notification.success({ message: "Đăng ký thành công" });
    //   console.log(res);
    //   navigate("/login");
    // } else {
    //   notification.error({
    //     message: "Người dùng đã tồn tại",
    //   });
    //   console.log(res);
    // }
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
          <legend>Đăng Ký Tài Khoản</legend>
          <Form name='basic' onFinish={onFinish} autoComplete='off' layout='vertical'>
            <Form.Item
              label='User name'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

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
            Đã có tài khoản? <Link to={'/auth/login'}>Đăng nhập</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  )
}
