import { useState } from 'react'
import { BsFillPencilFill, BsTrashFill } from 'react-icons/bs'
import { MdAdd } from 'react-icons/md'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { FormField } from '@components/FormField'
import { ITodo } from '@typing'
import style from './style.module.scss'

interface ITodoItem {
  todo: ITodo
}

export const TodoItem = ({ todo }: ITodoItem) => {
  const [isEditing, setIsEditing] = useState(false)

  const formikUpdate = useFormik({
    initialValues: {
      title: todo.title,
      priority: todo.priority,
      isCompleted: false
    },
    validationSchema: object({
      title: string().required('Title is a required field').min(3, 'Too short !').max(30, 'Too long !'),
      priority: string()
        .oneOf(['Low', 'Medium', 'High'], 'Priority must be either Low, Medium, or High')
        .required('Priority is a required field')
    }),
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const handleToggleEditSave = () => {
    if (isEditing) {
      formikUpdate.submitForm()
    }
    setIsEditing(!isEditing)
  }

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
            name='check'
            style={{ fontSize: '1.1rem', border: '1px solid gray' }}
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
            </div>
          )}
        </div>
        <div className={style['task__right']}>
          <span className={style['task__button']} onClick={handleToggleEditSave}>
            {!isEditing ? <BsFillPencilFill /> : <MdAdd />}
          </span>
          <span className={style['task__button']}>
            <BsTrashFill />
          </span>
        </div>
      </form>
    </li>
  )
}
