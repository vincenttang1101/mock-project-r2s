import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { useFormik } from 'formik'
import { object, string, ref } from 'yup'
import userApi from '@api/userApi'
import { isAuthenticated } from 'utils'
import { Title } from '@components'
import { FormField } from '@components/FormField'
import style from './style.module.scss'

interface IType {
  type: string
}

export const Auth = ({ type }: IType) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  }, [navigate])

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: object({
      email: string().required('Email is a required field').email('Invalid email address'),
      password: string().required('Password is a required field')
    }),
    onSubmit: (values, { resetForm }) => {
      userApi
        .loginUser(values)
        .then((response) => {
          localStorage.setItem('access-token', response.data.accessToken!)
          resetForm()
          navigate('/')
        })
        .catch((error) => alert(error.response.data.message))
    }
  })

  const formikRegister = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: object({
      name: string().required('Name is a required field'),
      email: string().required('Enail is a required field').email('Invalid email address'),
      password: string()
        .required('Password is a required field')
        .min(10, 'Too short !')
        .max(30, 'Too long !')
        .matches(/^(?=.*[a-z])/, 'Must Contain One Lowercase Character')
        .matches(/^(?=.*[A-Z])/, 'Must Contain One Uppercase Character')
        .matches(/^(?=.*[0-9])/, 'Must Contain One Number Character')
        .matches(/^(?=.*[!@#\$%\^&\*])/, 'Must Contain  One Special Case Character'),
      repeatPassword: string()
        .required('Repeat Password is a required field')
        .oneOf([ref('password')], 'Your passwords do not match.')
    }),
    onSubmit: (values, { resetForm }) => {
      userApi
        .registerUser(values)
        .then(() => {
          resetForm()
          navigate('/login')
        })
        .catch((error) => alert(error.response.data.errors.email))
    }
  })

  return (
    <Container className={style['auth']}>
      {type === 'Login' ? (
        <>
          <Title label='Login' style={{ textAlign: 'center' }} />
          <form onSubmit={formikLogin.handleSubmit}>
            <FormField
              field='Input'
              type='email'
              label='Email'
              name='email'
              onChange={formikLogin.handleChange}
              value={formikLogin.values.email}
            />
            {formikLogin.touched.email && formikLogin.errors.email ? (
              <span style={{ color: 'red' }}>{formikLogin.errors.email}</span>
            ) : null}
            <FormField
              field='Input'
              type='password'
              label='Password'
              name='password'
              autoComplete='true'
              onChange={formikLogin.handleChange}
              value={formikLogin.values.password}
            />
            {formikLogin.touched.password && formikLogin.errors.password ? (
              <span style={{ color: 'red' }}>{formikLogin.errors.password}</span>
            ) : null}
            <span>
              Don't have an account?
              <Link to='/register' style={{ textDecoration: 'none' }}>
                {' '}
                Register
              </Link>
            </span>
            <FormField field='Button' type='submit' name='Login'>
              Login
            </FormField>
          </form>
        </>
      ) : (
        <>
          <Title label='Register' style={{ textAlign: 'center' }} />
          <form onSubmit={formikRegister.handleSubmit}>
            <FormField
              field='Input'
              type='text'
              label='Name'
              name='name'
              onChange={formikRegister.handleChange}
              value={formikRegister.values.name}
            />
            {formikRegister.touched.name && formikRegister.errors.name ? (
              <span style={{ color: 'red' }}>{formikRegister.errors.name}</span>
            ) : null}
            <FormField
              field='Input'
              type='email'
              label='Email'
              name='email'
              onChange={formikRegister.handleChange}
              value={formikRegister.values.email}
            />
            {formikRegister.touched.email && formikRegister.errors.email ? (
              <span style={{ color: 'red' }}>{formikRegister.errors.email}</span>
            ) : null}
            <FormField
              field='Input'
              type='password'
              label='Password'
              name='password'
              autoComplete='true'
              onChange={formikRegister.handleChange}
              value={formikRegister.values.password}
            />
            {formikRegister.touched.password && formikRegister.errors.password ? (
              <span style={{ color: 'red' }}>{formikRegister.errors.password}</span>
            ) : null}
            <FormField
              field='Input'
              type='password'
              label='Repeat Password'
              name='repeatPassword'
              autoComplete='true'
              onChange={formikRegister.handleChange}
              value={formikRegister.values.repeatPassword}
            />
            {formikRegister.touched.repeatPassword && formikRegister.errors.repeatPassword ? (
              <span style={{ color: 'red' }}>{formikRegister.errors.repeatPassword}</span>
            ) : null}
            <FormField field='Button' type='submit' name='Register'>
              Register
            </FormField>
          </form>
        </>
      )}
    </Container>
  )
}
