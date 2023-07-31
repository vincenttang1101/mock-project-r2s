import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import todoApi from '@api/todoApi'
import { ITodo, ITodoState } from '@typing'

const initialState: ITodoState = {
  todos: [],
  status: 'idle'
}

export const addTodo = createAsyncThunk(
  'todo/addTodo',
  async (todo: ITodo) => {
    const response = await todoApi.addTodo(todo)
    return response.data
  }
);


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodo.pending, (state) => {
      state.status = 'loading'
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.status = 'idle'
      state.todos.push(action.payload)
    });
    builder.addCase(addTodo.rejected, (state) => {
      state.status = 'failed'
    });
  }
})


export default todoSlice.reducer
