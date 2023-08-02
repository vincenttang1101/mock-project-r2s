import { FormField } from '@components/FormField'
import style from './style.module.scss'

export const FilterTodo = () => {
  return (
    <div className={style['filterTodo']}>
      <FormField field='Select' name='filter'>
        <option value='All'>All</option>
        <option value='Uncompleted'>Uncompleted</option>
        <option value='Completed'>Completed</option>
      </FormField>
    </div>
  )
}
