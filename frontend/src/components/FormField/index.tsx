import { ReactNode } from 'react'
import { FormSelect } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

type Field = 'Input' | 'Select' | 'Button' | 'Check'
type Type = 'text' | 'email' | 'password' | 'checkbox' | 'submit' | 'reset'

interface IFormFile {
  field: Field
  type?: Type
  label?: string
  name?: string
  variant?: 'primary' | 'outline-secondary' | string
  children?: ReactNode
  [key: string]: unknown
  style?: object
}

export const FormField = ({ field, type, label, name, variant, children, style, ...rest }: IFormFile) => {
  const renderField = (field: string) => {
    switch (field) {
      case 'Input':
        return <Form.Control type={type} placeholder={label} name={name} style={style} {...rest} />
      case 'Button':
        return (
          <Button type='submit' variant={variant} style={style} {...rest}>
            {children}
          </Button>
        )
      case 'Select':
        return (
          <FormSelect name={name} style={style} {...rest}>
            {children}
          </FormSelect>
        )
      case 'Check':
        return (
          <Form.Check>
            <Form.Check.Input name={name} style={style} {...rest} />
          </Form.Check>
        )
      default:
        return null
    }
  }

  return <>{renderField(field)}</>
}
