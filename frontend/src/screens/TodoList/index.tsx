import { Title } from '@components/Title'
import { Container } from 'react-bootstrap'
import { FormField } from '@components/FormField'
import style from './style.module.scss'

export const TodoList = () => {
  return (
    <Container className={style['todos']}>
      <Title name='Todo List' />
      <FormField field='Input' type='text' label='Title' name='title' />
      <FormField field='Select' name='piority'>
        <option value='all'>Piority</option>
        <option value='low'>Low</option>
        <option value='medium'>Medium</option>
        <option value='heigh'>Heigh</option>
      </FormField>
      <div className={style['todos__button']}>
        <FormField field='Button' type='submit' label='Add'>
          Add
        </FormField>
        <FormField field='Select' name='filterTodo'>
          <option value='all'>Status</option>
          <option value='uncompleted'>Uncompleted</option>
          <option value='completed'>Completed</option>
        </FormField>
        <FormField field='Button' type='submit' label='Search'>
          Search
        </FormField>
      </div>
      <ul className={style['todos__list']}>
        <li className={style['todo']}>
          <div className={style['todo__task']}>
            <div className={style['task__left']}>
              <input className={style['task__check']} type='checkbox' />
              <span className={style['task__title']}>ReactJS</span>
            </div>
            <div className={style['task__right']}>
              <button>🖊️</button>
              <button>🗑️</button>
            </div>
          </div>
          <div className={style['todo__description']}>
            <span className={`${style['description__priority']} ${style['description__priority--isLow']}`}>Low</span>
          </div>
        </li>
        <li className={style['todo']}>
          <div className={style['todo__task']}>
            <div className={style['task__left']}>
              <input className={style['task__check']} type='checkbox' />
              <span className={style['task__title']}>NodeJS</span>
            </div>
            <div className={style['task__right']}>
              <button>🖊️</button>
              <button>🗑️</button>
            </div>
          </div>
          <div className={style['todo__description']}>
            <span className={`${style['description__priority']} ${style['description__priority--isLow']}`}>Low</span>
          </div>
        </li>
      </ul>
    </Container>
  )
}
