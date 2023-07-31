import { FormField } from '@components/FormField'

export const FilterTodo = () => {
  return (
    <FormField field='Select' name='filter'>
      <option value='All'>All</option>
      <option value='Uncompleted'>Uncompleted</option>
      <option value='Completed'>Completed</option>
    </FormField>
  )
}
