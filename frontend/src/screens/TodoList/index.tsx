import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { MdAdd } from 'react-icons/md'
import { BsFillPencilFill, BsTrashFill } from 'react-icons/bs'
import { FormField } from '@components/FormField'
import { Title } from '@components/Title'
import { isAuthenticated } from '@constants'
import style from './style.module.scss'

export const TodoList = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    } else navigate('/login')
  }, [navigate])

  return (
    <Container className={style['todos']}>
      <Title name='Todo List' style={{ textAlign: 'center' }} />
      <FormField field='Input' type='text' label='Title' name='title' />
      <FormField field='Select' name='piority'>
        <option value='all'>Piority</option>
        <option value='low'>Low</option>
        <option value='medium'>Medium</option>
        <option value='heigh'>Heigh</option>
      </FormField>
      <div className={style['todos__button']}>
        <FormField field='Select' name='filter'>
          <option value='all'>Status</option>
          <option value='uncompleted'>Uncompleted</option>
          <option value='completed'>Completed</option>
        </FormField>
        <FormField field='Button' type='submit' label='Search' variant='outline-primary'>
          <MdAdd />
        </FormField>
      </div>
      <ul className={style['todos__list']}>
        <li className={style['todo']}>
          <div className={style['todo__task']}>
            <div className={style['task__left']}>
              <FormField
                field='Check'
                type='checkbox'
                name='check'
                styleCustom={{ fontSize: '1.1rem', border: '1px solid gray' }}
              />
              <span className={style['task__title']}>ReactJS</span>
              <span className={`${style['task__priority']} ${style['task__priority--isLow']}`}>Low</span>
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
        <li className={style['todo']}>
          <div className={style['todo__task']}>
            <div className={style['task__left']}>
              <FormField
                field='Check'
                type='checkbox'
                name='check'
                styleCustom={{ fontSize: '1.1rem', border: '1px solid gray' }}
              />
              <span className={style['task__title']}>ReactJS</span>
              <span className={`${style['task__priority']} ${style['task__priority--isLow']}`}>Low</span>
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
      </ul>
    </Container>
  )
}
