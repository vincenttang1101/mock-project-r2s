import { Container } from 'react-bootstrap'
import style from './style.module.scss'
import { BsFacebook, BsGithub, BsYoutube } from 'react-icons/bs'

export const Footer = () => {
  return (
    <Container fluid className={style['footer']}>
      <div className={style['footer__icon']}>
        <BsFacebook className={`${style.icon} ${style['icon--fb']}`} />
        <BsGithub className={`${style.icon} ${style['icon--github']}`} />
        <BsYoutube className={`${style.icon} ${style['icon--ytb']}`} />
      </div>
      <p>Coppy right &copy; Vincent Tang</p>
    </Container>
  )
}
