import { Outlet } from 'react-router-dom'

export default function AuthPage() {
  return (
    <>
      <div className='container mx-auto'>
        <Outlet />
      </div>
    </>
  )
}
