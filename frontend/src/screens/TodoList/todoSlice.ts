import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import todoApi from '@api/todoApi'
import { ITodo, ITodoState } from '@typing'

const initialState: ITodoState = {
  todos: [],
  status: 'idle'
}

export const getTodos = createAsyncThunk('todo/getTodos', async () => {
  const response = await todoApi.getTodos()
  return response.data
})
export const addTodo = createAsyncThunk('todo/addTodo', async (todo: ITodo) => {
  const response = await todoApi.addTodo(todo)
  return response.data
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async (todo: ITodo | any) => {
  const response = await todoApi.updateTodo(todo)
  return response.data
})

// export const deleteTodo = createAsyncThunk(
//   'todo/deleteTodo',
//   async (_id: string) => {
//     const response = await todoApi.deleteTodo(_id)
//     return response.data
//   }
// );

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodo.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.status = 'idle'
      state.todos.push(action.payload)
    })
    builder.addCase(addTodo.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(getTodos.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.status = 'idle'
      state.todos = action.payload
    })
    builder.addCase(getTodos.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(updateTodo.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.status = 'idle'
      const todoIdx = state.todos.findIndex((todo) => todo._id === action.payload._id)
      state.todos[todoIdx] = action.payload
    })
    builder.addCase(updateTodo.rejected, (state) => {
      state.status = 'failed'
    })
  }
})

export default todoSlice.reducer
