import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { useAppSelector, useAppDispatch } from '@app/hook'
import { INITIAL_LIMIT_PAGE } from '@constants'
import { paginateTodos } from '@screens/TodoList/todoSlice'
import style from './style.module.scss'

export const PaginateTodos = () => {
  const [gatherPages, setGatherPages] = useState<number[]>([])
  const totalTodos = useAppSelector((state) => state.todo.totalTodos)

  const limit = useAppSelector((state) => state.todo.limit)
  const filterType = useAppSelector((state) => state.todo.filterType)
  const startPageRedux = useAppSelector((state) => state.todo.startPage)

  const dispatch = useAppDispatch()

  const handlePaginateClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const selectedPage = parseInt((e.target as any).textContent, 10)

    const totalPages = Math.ceil(totalTodos / INITIAL_LIMIT_PAGE)
    const remainder = totalTodos % limit === 0 ? 4 : totalTodos % limit
    const limitUpdated = selectedPage === totalPages ? remainder : INITIAL_LIMIT_PAGE

    dispatch(paginateTodos({ startPage: selectedPage, limit: limitUpdated, filterType }))
  }

  useEffect(() => {
    const gatherPages = []

    for (let startPageTemp = 1; startPageTemp <= Math.ceil(totalTodos / INITIAL_LIMIT_PAGE); startPageTemp++) {
      gatherPages.push(startPageTemp)
    }

    setGatherPages(gatherPages)
  }, [totalTodos])

  return (
    <Container className={style['paginateTodos']}>
      <Pagination>
        {gatherPages.map((page, index) => (
          <Pagination.Item
            key={index}
            onClick={handlePaginateClick}
            active={page === startPageRedux}
            linkStyle={{ cursor: 'pointer' }}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  )
}
