import { ReactNode } from 'react'
import { FormSelect } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import style from './style.module.scss'

interface IFormFile {
  field: 'Input' | 'Select' | 'Button'
  type?: 'text' | 'email' | 'password' | 'submit' | 'reset' | string
  label?: string
  name?: string
  variant?: 'primary' | 'outline-secondary' | string
  children?: ReactNode
}

export const FormField = ({ field, type, label, name, variant, children }: IFormFile) => {
  const handleSwitchField = (field: string) => {
    switch (field) {
      case 'Input':
        return <Form.Control type={type} placeholder={label} name={name} />
      case 'Button':
        return (
          <Button type='submit' variant={variant}>
            {children}
          </Button>
        )
      case 'Select':
        return <FormSelect name={name}>{children}</FormSelect>
      default:
        return null
    }
  }

  return <div className={style['formField']}>{handleSwitchField(field)}</div>
}
