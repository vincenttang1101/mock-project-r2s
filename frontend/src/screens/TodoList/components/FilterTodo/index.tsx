import { useAppDispatch } from '@app/hook'
import { FormField } from '@components/FormField'
import { INITIAL_LIMIT_PAGE } from '@constants'
import { handleStartPage, paginateTodos } from '@screens/TodoList/todoSlice'
import { ITodosFilter } from '@typing/todoType'
import { getUserID } from '@utils'
import style from './style.module.scss'

export const FilterTodo = () => {
  const dispatch = useAppDispatch()

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterType: ITodosFilter = { user_id: getUserID() }

    if (e.target.value === 'false' || e.target.value === 'true') {
      filterType.isCompleted = e.target.value
    } else if (e.target.value === 'Low' || e.target.value === 'Medium' || e.target.value === 'High') {
      filterType.priority = e.target.value
    }

    const params = { startPage: 1, limit: INITIAL_LIMIT_PAGE, filterType }

    handleStartPage({ startPage: 1 })

    dispatch(paginateTodos(params))
  }

  return (
    <div className={style['filterTodo']}>
      <FormField field='Select' name='filter' onChange={handleChangeType}>
        <option value='all'>All</option>
        {/* <option value='true'>Completed</option> */}
        {/* <option value='false'>Uncompleted</option> */}
        <option value='Low'>Low</option>
        <option value='Medium'>Medium</option>
        <option value='High'>High</option>
      </FormField>
    </div>
  )
}
