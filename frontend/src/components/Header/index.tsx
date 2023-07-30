import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { isAuthenticated } from '@constants'
import reactLogo from '@assets/react.svg'
import style from './style.module.scss'

export const Header = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [name, setName] = useState('Login')
  const location = useLocation()

  function handleLogout() {
    localStorage.removeItem('access-token')
    setAuthenticated(false)
  }

  useEffect(() => {
    setAuthenticated(isAuthenticated())

    if (location.pathname === '/login') {
      setName('Login')
    } else if (location.pathname === '/') {
      setName('Logout')
    }
  }, [location.pathname])

  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container className={style['header']}>
        <Navbar className={`${style['header__nav']} ${style['header__nav--left']}`}>
          <img alt='logo' src={reactLogo} />
          <Link to='/'>Todo List</Link>
        </Navbar>
        <Nav className={`me-auto ${style['header__nav']} ${style['header__nav--right']}`}>
          <Link to='/'>Home</Link>
          <Link to='/login' onClick={authenticated ? handleLogout : undefined}>
            {name}
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
