import { Link } from 'react-router-dom'
import { Button } from 'antd'
import canvasLogo from './canvas-logo.svg'
import { Avatar } from '../Avatar/Avatar'
import { useStateContext } from '@src/hooks'

export const Header = () => {
  const { state } = useStateContext()

  return (
    <>
      <header className='fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between bg-white px-16 shadow'>
        <div className='flex items-center gap-3'>
          <div className='h-7'>
            <Link to={'/'}>
              <img src={canvasLogo} alt='' className='h-full' />
            </Link>
          </div>
          <div>Menu</div>
        </div>
        <div className='flex items-center'>
          {state.auth.isAuth ? (
            <Avatar />
          ) : (
            <div className='flex gap-3'>
              <Link to={'/auth/login'}>
                <Button>Đăng nhập</Button>
              </Link>
              <Link to={'/auth/signup'}>
                <Button className=''>Đăng ký</Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
