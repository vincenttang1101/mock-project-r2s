import { Container } from 'react-bootstrap'
import { BsFacebook, BsGithub, BsYoutube } from 'react-icons/bs'
import style from './style.module.scss'

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
