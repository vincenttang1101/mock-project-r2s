import { useEffect, useRef, useState } from 'react'
import { BsFillPencilFill, BsTrashFill } from 'react-icons/bs'
import { BiSave } from 'react-icons/bi'
import { MdOutlineCancel } from 'react-icons/md'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useAppDispatch, useAppSelector } from '@app/hook'
import { FormField } from '@components/FormField'
import { ITodo } from '@typing'
import style from './style.module.scss'
import { deleteTodo, updateTodo } from '@screens/TodoList/todoSlice'

interface ITodoItem {
  todo: ITodo
}

export const TodoItem = ({ todo }: ITodoItem) => {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState<string>('Priority')

  const startPage = useAppSelector((state) => state.todo.startPage)
  const limit = useAppSelector((state) => state.todo.limit)
  const filterType = useAppSelector((state) => state.todo.filterType)

  const dispatch = useAppDispatch()

  const formikTodo = useFormik({
    initialValues: {
      _id: todo._id,
      title: todo.title,
      priority: todo.priority,
      isCompleted: todo.isCompleted
    },
    validationSchema: object({
      title: string().required('Title is a required field').min(3, 'Too short !').max(30, 'Too long !'),
      priority: string()
        .oneOf(['Low', 'Medium', 'High'], 'Priority must be either Low, Medium, or High')
        .required('Priority is a required field')
    }),
    onSubmit: (todo) => {
      dispatch(updateTodo(todo))
    }
  })

  const initialValuesRef = useRef(formikTodo.initialValues)

  const handleSwitchPriority = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'isLow'
      case 'Medium':
        return 'isMedium'
      case 'High':
        return 'isHigh'
      default:
        return null
    }
  }

  const handleCheckedChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement

    dispatch(
      updateTodo({
        _id: formikTodo.values._id,
        isCompleted: target.checked
      })
    )

    formikTodo.handleChange(e)
  }

  const handleToggleEditSave = () => {
    if (isEditing) {
      formikTodo.validateForm().then((errors) => {
        if (Object.keys(errors).length === 0) {
          setIsEditing(false)
        }
        formikTodo.submitForm()
      })
    } else {
      initialValuesRef.current = formikTodo.values
      setIsEditing(true)
    }
  }

  const handleToggleRemoveCancel = () => {
    if (isEditing) {
      formikTodo.setValues(initialValuesRef.current)
      setIsEditing(false)
    } else {
      if (formikTodo.values._id) {
        const params = { _id: formikTodo.values._id, startPage, limit, filterType }
        dispatch(deleteTodo(params))
      }
    }
  }

  useEffect(() => {
    switch (filterType?.priority) {
      case 'Low':
        setSelectedPriority('Low')
        formikTodo.setFieldValue('priority', 'Low')
        break
      case 'Medium':
        setSelectedPriority('Medium')
        formikTodo.setFieldValue('priority', 'Medium')
        break
      case 'High':
        setSelectedPriority('High')
        formikTodo.setFieldValue('priority', 'High')
        break
    }
  }, [filterType])

  return (
    <li className={style['todo']}>
      <span className={`${style['todo__createdAt']}`}>{dayjs(todo.createdAt).format('DD//MM/YYYY hh:mm:ss')}</span>
      <form
        onSubmit={formikTodo.handleSubmit}
        className={`${style['todo__task']} ${isEditing && style['todo__task--isEditing']}`}
      >
        <div className={style['task__left']}>
          <FormField
            field='Check'
            type='checkbox'
            name='isCompleted'
            className={style['task__check']}
            style={{ fontSize: '1.1rem', border: '1px solid gray' }}
            checked={formikTodo.values.isCompleted}
            onChange={handleCheckedChange}
          />
          {!isEditing ? (
            <>
              <span className={style['task__title']}>{todo.title}</span>
              <span
                className={`${style['task__priority']} ${
                  style[`task__priority--${handleSwitchPriority(todo.priority)}`]
                } `}
              >
                {todo.priority}
              </span>
            </>
          ) : (
            <div className={style['task__formField']}>
              <FormField
                field='Input'
                type='text'
                name='title'
                onChange={formikTodo.handleChange}
                value={formikTodo.values.title}
              />
              {formikTodo.touched.title && formikTodo.errors.title ? (
                <span style={{ color: 'red' }}>{formikTodo.errors.title}</span>
              ) : null}
              <FormField
                field='Select'
                name='priority'
                onChange={formikTodo.handleChange}
                value={formikTodo.values.priority}
              >
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
              {formikTodo.touched.priority && formikTodo.errors.priority ? (
                <span style={{ color: 'red' }}>{formikTodo.errors.priority}</span>
              ) : null}
            </div>
          )}
        </div>
        <div className={style['task__right']}>
          <span className={`${style['task__button']} ${style['task__button--isSave']}`} onClick={handleToggleEditSave}>
            {!isEditing ? <BsFillPencilFill /> : <BiSave />}
          </span>
          <span
            className={`${style['task__button']} ${style['task__button--isCancel']}`}
            onClick={handleToggleRemoveCancel}
          >
            {!isEditing ? <BsTrashFill /> : <MdOutlineCancel />}
          </span>
        </div>
      </form>
    </li>
  )
}
