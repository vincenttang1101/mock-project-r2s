import { useAppDispatch, useAppSelector } from '@app/hook'
import { FormField } from '@components/FormField'
import { paginateTodos } from '@screens/TodoList/todoSlice'
import style from './style.module.scss'

export const FilterTodo = () => {
  const dispatch = useAppDispatch()

  const startPage = useAppSelector((state) => state.todo.startPage)
  const limit = useAppSelector((state) => state.todo.limit)

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filterType = {}
    if (e.target.value === 'false' || e.target.value === 'true') {
      filterType = { isCompleted: e.target.value }
    } else filterType = { priority: e.target.value }

    const params = { startPage, limit, filterType }
    dispatch(paginateTodos(params))
  }

  return (
    <div className={style['filterTodo']}>
      <FormField field='Select' name='filter' onChange={handleChangeType}>
        <option value='all'>All</option>
        <option value='false'>Uncompleted</option>
        <option value='true'>Completed</option>
        <option value='Low'>Low</option>
        <option value='Medium'>Medium</option>
        <option value='High'>High</option>
      </FormField>
    </div>
  )
}
