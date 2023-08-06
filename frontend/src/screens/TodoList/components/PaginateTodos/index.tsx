import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { useAppSelector, useAppDispatch } from '@app/hook'
import { LIMIT_PAGES } from '@constants'
import { paginateTodos } from '@screens/TodoList/todoSlice'
import style from './style.module.scss'

interface numbersPage {
  startPage: number
  numberPage: number
}

export const PaginateTodos = () => {
  const [numbersPage, setNumbersPage] = useState<numbersPage[]>([])
  const [activeNumberPage, setActiveNumberPage] = useState<number>(1)
  const totalTodos = useAppSelector((state) => state.todo.totalTodos)

  const dispatch = useAppDispatch()

  const handlePaginateClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const selectedPage = parseInt((e.target as any).textContent, 10)

    dispatch(paginateTodos({ startPage: selectedPage, limit: LIMIT_PAGES }))
    setActiveNumberPage(selectedPage)
  }

  useEffect(() => {
    const numbersPage = []
    let startPage = totalTodos

    for (let numberPage = 1; numberPage <= Math.ceil(totalTodos / LIMIT_PAGES); numberPage++) {
      startPage = numberPage !== 1 ? startPage - LIMIT_PAGES : startPage - LIMIT_PAGES - 1

      numbersPage.push({ numberPage, startPage })
    }
    setNumbersPage(numbersPage)
  }, [totalTodos])

  return (
    <Container className={style['paginateTodos']}>
      <Pagination>
        {numbersPage.map((numberPage, index) => (
          <Pagination.Item
            key={index}
            data-page={numberPage.startPage}
            onClick={handlePaginateClick}
            active={numberPage.numberPage === activeNumberPage}
          >
            {numberPage.numberPage}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  )
}
