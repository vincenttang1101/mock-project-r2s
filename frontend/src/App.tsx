import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Footer, Header } from '@components'
import './App.css'

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
