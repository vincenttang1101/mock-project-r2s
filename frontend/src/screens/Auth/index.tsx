import Container from 'react-bootstrap/Container'
import { FormField } from '@components/FormField'
import { Title } from '@components'
import style from './style.module.scss'

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
