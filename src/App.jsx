import { useEffect } from 'react'
import Container from './components/Container/Container'
import { Header } from './components/Header/Header'
import { getProfileAction } from './pages/auth/authAction'
import { useStateContext } from './hooks'

export default function App() {
  const { dispatch } = useStateContext()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      getProfileAction({ dispatch })
    }
  }, [dispatch])

  return (
    <>
      {/* <div className='flex h-screen items-center justify-center'>
          <Spin size='large' tip='Loading'>
            <div className='p-12' />
          </Spin>
        </div> */}
      <Header />
      <Container>
        <h1>Hello</h1>
      </Container>
    </>
  )
}

