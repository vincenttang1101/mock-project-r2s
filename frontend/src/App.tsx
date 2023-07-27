import { Outlet } from 'react-router-dom'
import './App.css'
import { Footer, Header } from '@components'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <>
      <Header />
      <Container className='main'>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default App
