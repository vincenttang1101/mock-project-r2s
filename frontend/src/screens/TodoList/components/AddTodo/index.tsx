import { useState, useEffect } from 'react'
import { GrAdd } from 'react-icons/gr'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useAppDispatch, useAppSelector } from '@app/hook'
import { FormField } from '@components/FormField'
import { addTodo } from '@screens/TodoList/todoSlice'
import { getUserID } from '@utils'
import style from './style.module.scss'

export const AddTodo = () => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState<string>('Priority')

  const startPage = useAppSelector((state) => state.todo.startPage)
  const filterType = useAppSelector((state) => state.todo.filterType)
  const dispatch = useAppDispatch()

  const formikAdd = useFormik({
    initialValues: {
      title: '',
      priority: '',
      isCompleted: false,
      user_id: getUserID()
    },
    validationSchema: object({
      title: string().required('Title is a required field').min(3, 'Too short !').max(30, 'Too long !'),
      priority: string()
        .oneOf(['Low', 'Medium', 'High'], 'Priority must be either Low, Medium, or High')
        .required('Priority is a required field')
    }),
    onSubmit: async (todo, { resetForm }) => {
      const params = { ...todo, filterType }

      await dispatch(addTodo(params))
      resetForm()
      formikAdd.setFieldValue('priority', params.filterType.priority)

      if (!filterType.priority || filterType.isCompleted) {
        resetForm()
      }
    }
  })

  useEffect(() => {
    if (startPage !== 1 && startPage) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }

    if (Object.keys(filterType).length !== 1) {
      formikAdd.resetForm()
    }

    switch (filterType?.priority) {
      case 'Low':
        setSelectedPriority('Low')
        formikAdd.setFieldValue('priority', 'Low')
        break
      case 'Medium':
        setSelectedPriority('Medium')
        formikAdd.setFieldValue('priority', 'Medium')
        break
      case 'High':
        setSelectedPriority('High')
        formikAdd.setFieldValue('priority', 'High')
        break
      default:
        setSelectedPriority('Priority')
        formikAdd.setFieldValue('priority', 'priority')
        break
    }
  }, [filterType, startPage, dispatch])

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
          {selectedPriority === 'Priority' && (
            <>
              <option value=''>Piority</option>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </>
          )}
          {selectedPriority === 'Low' && <option value='Low'>Low</option>}
          {selectedPriority === 'Medium' && <option value='Medium'>Medium</option>}
          {selectedPriority === 'High' && <option value='High'>High</option>}
        </FormField>
        {formikAdd.touched.priority && formikAdd.errors.priority ? (
          <span style={{ color: 'red' }}>{formikAdd.errors.priority}</span>
        ) : null}
      </div>
      <FormField className={style['addTodo__button']} field='Button' type='submit' disabled={isDisabled}>
        <GrAdd />
      </FormField>
    </form>
  )
}
