import { BsFillPencilFill, BsTrashFill } from 'react-icons/bs'
import { FormField } from '@components/FormField'
import { ITodo } from '@typing'
import style from './style.module.scss'

interface ITodoItem {
  todo: ITodo
}

export const TodoItem = ({ todo }: ITodoItem) => {
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
      <div className={style['todo__task']}>
        <div className={style['task__left']}>
          <FormField
            field='Check'
            type='checkbox'
            name='check'
            style={{ fontSize: '1.1rem', border: '1px solid gray' }}
          />
          <span className={style['task__title']}>{todo.title}</span>
          <span
            className={`${style['task__priority']} ${style[`task__priority--${handleSwitchPriority(todo.priority)}`]} `}
          >
            {todo.priority}
          </span>
        </div>
        <div className={style['task__right']}>
          <span className={style['task__button']}>
            <BsFillPencilFill />
          </span>
          <span className={style['task__button']}>
            <BsTrashFill />
          </span>
        </div>
      </div>
    </li>
  )
}
