import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const Err403 = () => (
  <Result
    status='403'
    title='403'
    subTitle='Xin lỗi, bạn không được phép truy cập trang này.'
    extra={
      <Link to={'/'}>
        <Button type='primary'>Quay lại trang chủ</Button>
      </Link>
    }
  />
)
export default Err403
