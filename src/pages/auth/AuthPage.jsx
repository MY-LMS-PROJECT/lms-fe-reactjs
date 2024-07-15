import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Container from '../../components/Container/Container'
import { useStateContext } from '@src/hooks'

export default function AuthPage() {
  const { state } = useStateContext()

  if (state?.auth?.isAuth) return <Navigate to={'/'} />

  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
