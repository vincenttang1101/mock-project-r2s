import { useState } from 'react'
import { BsFillPencilFill, BsTrashFill } from 'react-icons/bs'
import { BiSave } from 'react-icons/bi'
import { MdAdd, MdOutlineCancel } from 'react-icons/md'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { useAppDispatch } from '@app/hook'
import { FormField } from '@components/FormField'
import { ITodo } from '@typing'
import style from './style.module.scss'
import { deleteTodo, updateTodo } from '@screens/TodoList/todoSlice'

interface ITodoItem {
  todo: ITodo
}

export const TodoItem = ({ todo }: ITodoItem) => {
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useAppDispatch()

  const formikUpdate = useFormik({
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
        _id: formikUpdate.values._id,
        isCompleted: target.checked
      })
    )

    formikUpdate.handleChange(e)
  }

  const handleToggleEditSave = () => {
    if (isEditing) {
      formikUpdate.validateForm().then((errors) => {
        if (Object.keys(errors).length === 0) {
          setIsEditing(false)
        }
        formikUpdate.submitForm()
      })
    } else {
      setIsEditing(true)
    }
  }

  const handleToggleRemoveCancel = () => {
    if (isEditing) {
      setIsEditing(false)
    } else {
      if (formikUpdate.values._id) {
        dispatch(deleteTodo(formikUpdate.values._id))
      }
    }
  }

  return (
    <li className={style['todo']}>
      <form
        onSubmit={formikUpdate.handleSubmit}
        className={`${style['todo__task']} ${isEditing && style['todo__task--isEditing']}`}
      >
        <div className={style['task__left']}>
          <FormField
            field='Check'
            type='checkbox'
            name='isCompleted'
            className={style['task__check']}
            style={{ fontSize: '1.1rem', border: '1px solid gray' }}
            checked={formikUpdate.values.isCompleted}
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
                onChange={formikUpdate.handleChange}
                value={formikUpdate.values.title}
              />
              {formikUpdate.touched.title && formikUpdate.errors.title ? (
                <span style={{ color: 'red' }}>{formikUpdate.errors.title}</span>
              ) : null}
              <FormField
                field='Select'
                name='priority'
                onChange={formikUpdate.handleChange}
                value={formikUpdate.values.priority}
              >
                <option value=''>Piority</option>
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
              </FormField>
              {formikUpdate.touched.priority && formikUpdate.errors.priority ? (
                <span style={{ color: 'red' }}>{formikUpdate.errors.priority}</span>
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
