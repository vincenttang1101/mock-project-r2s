import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import reactLogo from '@assets/react.svg'
import style from './style.module.scss'

export const Header = () => {
  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container className={style['header']}>
        <Navbar.Brand href='/'>
          <img alt='logo' src={reactLogo} /> Todo List
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
