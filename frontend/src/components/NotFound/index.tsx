import { Container } from 'react-bootstrap'
import style from './style.module.scss'

export const NotFound = () => {
  return (
    <Container className={style['not-found']}>
      <h1>404</h1>
      <h2>Oops! Page Not Be Found</h2>
      <p>
        Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily
        unavailable
      </p>
      <a href='/'>Back to homepage</a>
    </Container>
  )
}
