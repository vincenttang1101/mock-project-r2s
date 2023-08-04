import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { useAppSelector, useAppDispatch } from '@app/hook'
import style from './style.module.scss'
import { paginateTodos } from '@screens/TodoList/todoSlice'

export const PaginateTodos = () => {
  const [numbersPage, setNumbersPage] = useState<number[]>([])
  const totalItems = useAppSelector((state) => state.todo.totalItems)

  const dispatch = useAppDispatch()

  const handlePaginateClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const selectedPage = parseInt(e.target.textContent, 10)
    const limit = 4
    const start = (selectedPage - 1) * limit + 1
    dispatch(paginateTodos({ page: start, limit }))
  }

  useEffect(() => {
    const pages = []
    for (let page = 1; page <= totalItems / 4; page++) {
      pages.push(page)
    }
    setNumbersPage(pages)
  }, [totalItems])

  return (
    <Container className={style['paginateTodos']}>
      <Pagination>
        {numbersPage.map((page, index) => (
          <Pagination.Item key={index} onClick={handlePaginateClick}>
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  )
}
