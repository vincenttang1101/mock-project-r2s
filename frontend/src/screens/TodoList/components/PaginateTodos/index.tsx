import { Container } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import style from './style.module.scss'

interface IPaginateTodos {
  items: number[]
}
export const PaginateTodos = ({ items }: IPaginateTodos) => {
  return (
    <Container className={style['paginateTodos']}>
      <Pagination>
        {items.map((item) => (
          <Pagination.Item>{item}</Pagination.Item>
        ))}
      </Pagination>
    </Container>
  )
}
