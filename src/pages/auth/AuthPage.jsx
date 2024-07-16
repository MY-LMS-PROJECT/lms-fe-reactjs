import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '@src/hooks'
import Container from '@src/components/Container/Container'
import { useEffect } from 'react'
import { getProfileAction } from './authAction'

export default function AuthPage() {
  const { state, dispatch } = useStateContext()
  useEffect(() => {
    getProfileAction({ dispatch })
  })
  if (state?.auth?.isAuth) return <Navigate to={'/'} />

  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
