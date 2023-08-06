import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import todoApi from '@api/todoApi'
import { ITodo, ITodoState } from '@typing'

const initialState: ITodoState = {
  todos: [],
  totalTodos: 0,
  status: 'idle'
}

interface IPaginateParams {
  startPage: number
  limit: number
}

export const getTodos = createAsyncThunk('todo/getTodos', async () => {
  const response = await todoApi.getTodos()
  return response
})

export const addTodo = createAsyncThunk('todo/addTodo', async (todo: ITodo) => {
  const response = await todoApi.addTodo(todo)
  return response
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async (todo: ITodo | any) => {
  const response = await todoApi.updateTodo(todo)
  return response
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (_id: string) => {
  const response = await todoApi.deleteTodo(_id)
  return response
})

export const paginateTodos = createAsyncThunk('todo/paginateTodos', async (params: IPaginateParams) => {
  const response = await todoApi.paginateTodos(params.startPage, params.limit)
  return response
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getTodos.pending, (state) => {
    //   state.status = 'loading'
    // })
    // builder.addCase(getTodos.fulfilled, (state, action) => {
    //   state.status = 'idle'
    //   state.totalTodos = action.payload.totalTodos
    // })
    // builder.addCase(getTodos.rejected, (state) => {
    //   state.status = 'failed'
    // })

    builder.addCase(addTodo.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.status = 'idle'
      state.todos.unshift(action.payload.data)
      state.todos.splice(4)
      state.totalTodos = action.payload.totalTodos
    })
    builder.addCase(addTodo.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(updateTodo.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.status = 'idle'
      const todoIdx = state.todos.findIndex((todo) => todo._id === action.payload.data._id)
      state.todos[todoIdx] = action.payload.data
      state.totalTodos = action.payload.totalTodos
    })
    builder.addCase(updateTodo.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(deleteTodo.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.status = 'idle'
      state.todos = state.todos.filter((todo) => todo._id !== action.payload.data._id)
      state.totalTodos = action.payload.totalTodos
    })
    builder.addCase(deleteTodo.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(paginateTodos.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(paginateTodos.fulfilled, (state, action) => {
      state.status = 'idle'
      state.todos = action.payload.data.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })
      state.totalTodos = action.payload.totalTodos
    })
    builder.addCase(paginateTodos.rejected, (state) => {
      state.status = 'failed'
    })
  }
})

export default todoSlice.reducer
