import { FormField } from '@components/FormField'
import style from './style.module.scss'
import { Title } from '@components'
import Container from 'react-bootstrap/Container'

interface IType {
  type: string
}

export const Auth = ({ type }: IType) => {
  return (
    <Container className={style['auth']}>
      {type === 'Login' ? (
        <>
          <Title name='Login' />
          <FormField field='Input' type='email' label='Email' name='email' />
          <FormField field='Input' type='password' label='password' name='Password' />
          <FormField field='Button' type='submit' name='Login'>
            Login
          </FormField>
        </>
      ) : (
        <>
          <Title name='Register' />
          <FormField field='Input' type='text' label='Name' name='name' />
          <FormField field='Input' type='email' label='Email' name='email' />
          <FormField field='Input' type='password' label='password' name='Password' />
          <FormField field='Input' type='password' label='Repeat Password' name='RepeatPassword' />
          <FormField field='Button' type='submit' name='Register'>
            Register
          </FormField>
        </>
      )}
    </Container>
  )
}
