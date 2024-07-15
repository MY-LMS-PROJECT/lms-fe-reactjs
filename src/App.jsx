import Container from './components/Container/Container'
import { Header } from './components/Header/Header'
import { useStateContext } from './hooks'

export default function App() {
  const { state } = useStateContext()
  console.log(state)

  return (
    <>
      <Header />
      <Container>
        <h1>Hello</h1>
      </Container>
    </>
  )
}

