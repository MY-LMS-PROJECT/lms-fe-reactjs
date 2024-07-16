import { useEffect } from 'react'
import Container from './components/Container/Container'
import { Header } from './components/Header/Header'
import { getProfileAction } from './pages/auth/authAction'
import { useStateContext } from './hooks'
import { Outlet } from 'react-router-dom'

export default function App() {
  const { dispatch } = useStateContext()

  useEffect(() => {
    getProfileAction({ dispatch })
  }, [dispatch])

  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

