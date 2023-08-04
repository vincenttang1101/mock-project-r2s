import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '@app/hook'
import { Title } from '@components/Title'
import { isAuthenticated } from 'utils'
import { AddTodo, PaginateTodos, TodoItem } from './components'
import { FilterTodo } from './components/FilterTodo'
import style from './style.module.scss'
import { Loader } from '@components/Loader'
import { getTodos, paginateTodos } from './todoSlice'

export const TodoList = () => {
  const todos = useAppSelector((state) => state.todo.todos)
  const status = useAppSelector((state) => state.todo.status)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
      dispatch(paginateTodos({ page: 1, limit: 4 }))
    } else navigate('/login')
  }, [navigate])

  return (
    <Container className={style['todos']}>
      <Title label='Todo List' style={{ textAlign: 'center' }} />
      <div className={style['todos__top']}>
        <AddTodo />
      </div>
      <div className={style['todos__bottom']}>
        <div className={style['bottom__filter']}>
          <label htmlFor='filter'>Filter By:</label>
          <FilterTodo />
        </div>
        <ul className={style['todos__list']}>
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
          <div className={style['bottom__loader']}>{status === 'loading' && <Loader />}</div>
        </ul>
      </div>
      <PaginateTodos items={[1, 2, 3]} />
    </Container>
  )
}
