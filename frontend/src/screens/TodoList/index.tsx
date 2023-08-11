import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import todoLogo from '@assets/todoLogo.svg'
import { useAppDispatch, useAppSelector } from '@app/hook'
import { Title } from '@components/Title'
import { Loader } from '@components/Loader'
import { INITIAL_LIMIT_PAGE } from '@constants'
import { getUserID, isAuthenticated } from '@utils'
import { AddTodo, PaginateTodos, TodoItem } from './components'
import { FilterTodo } from './components/FilterTodo'
import { paginateTodos } from './todoSlice'
import style from './style.module.scss'

export const TodoList = () => {
  const todos = useAppSelector((state) => state.todo.todos)
  const status = useAppSelector((state) => state.todo.status)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
      dispatch(paginateTodos({ startPage: 1, limit: INITIAL_LIMIT_PAGE, filterType: { user_id: getUserID() } }))
    } else navigate('/login')
  }, [navigate, dispatch])

  return (
    <Container className={style['todos']}>
      <Title style={{ textAlign: 'center' }}>
        <img src={todoLogo} />
      </Title>
      <div className={style['todos__addTodo']}>
        <AddTodo />
      </div>
      <div className={style['todos__filterTodo']}>
        <div className={style['filterTodo__formField']}>
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
      <PaginateTodos />
    </Container>
  )
}
