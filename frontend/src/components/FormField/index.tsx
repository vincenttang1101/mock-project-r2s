import style from './style.module.scss'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormSelect } from 'react-bootstrap'
import { ReactNode } from 'react'

interface IFormFile {
  field: 'Input' | 'Select' | 'Button'
  type?: 'text' | 'email' | 'password' | 'submit' | 'reset' | string
  label?: string
  name?: string
  variant?: 'primary' | 'outline-secondary' | string
  children?: ReactNode
}

export const FormField = ({ field, type, label, name, variant, children }: IFormFile) => {
  return (
    <div className={style['formField']}>
      {field === 'Input' && <Form.Control type={type} placeholder={label} name={name} />}
      {field === 'Button' && (
        <Button type='submit' variant={variant}>
          {children}
        </Button>
      )}
      {field === 'Select' && <FormSelect name={name}>{children}</FormSelect>}
    </div>
  )
}
