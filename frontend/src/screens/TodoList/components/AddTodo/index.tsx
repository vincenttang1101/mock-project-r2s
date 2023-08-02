import { MdAdd } from 'react-icons/md'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useAppDispatch } from '@app/hook'
import { FormField } from '@components/FormField'
import { addTodo } from '@screens/TodoList/todoSlice'
import style from './style.module.scss'

export const AddTodo = () => {
  const dispatch = useAppDispatch()

  const formikAdd = useFormik({
    initialValues: {
      title: '',
      priority: '',
      isCompleted: false
    },
    validationSchema: object({
      title: string().required('Title is a required field').min(3, 'Too short !').max(30, 'Too long !'),
      priority: string()
        .oneOf(['Low', 'Medium', 'High'], 'Priority must be either Low, Medium, or High')
        .required('Priority is a required field')
    }),
    onSubmit: (todo) => {
      dispatch(addTodo(todo))
    }
  })

  return (
    <form onSubmit={formikAdd.handleSubmit} className={style['addTodo']}>
      <div className={style['addTodo__title']}>
        <FormField
          field='Input'
          type='text'
          label='Title'
          name='title'
          onChange={formikAdd.handleChange}
          value={formikAdd.values.title}
        />
        {formikAdd.touched.title && formikAdd.errors.title ? (
          <span style={{ color: 'red' }}>{formikAdd.errors.title}</span>
        ) : null}
      </div>
      <div className={style['addTodo__priority']}>
        <FormField field='Select' name='priority' onChange={formikAdd.handleChange} value={formikAdd.values.priority}>
          <option value=''>Piority</option>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </FormField>
        {formikAdd.touched.priority && formikAdd.errors.priority ? (
          <span style={{ color: 'red' }}>{formikAdd.errors.priority}</span>
        ) : null}
      </div>
      <FormField field='Button' type='submit' variant='outline-primary'>
        <MdAdd />
      </FormField>
    </form>
  )
}
