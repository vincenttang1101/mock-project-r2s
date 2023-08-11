import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import todoApi from '@api/todoApi'
import { ITodo, ITodoAPI, ITodoState, ITodosFilter } from '@typing'
import { getUserID } from '@utils'

const initialState: ITodoState = {
  todos: [],
  totalTodos: 0,
  status: 'idle',
  startPage: 1,
  limit: 4,
  filterType: { user_id: getUserID() }
}

interface IPaginateParams {
  startPage: number
  limit: number
  filterType: object
}

interface IDeleteTodoParams {
  _id: string
  startPage: number
  limit: number
  filterType: ITodosFilter
}

interface IStartPagePayload {
  startPage: number
}

export const getTodos = createAsyncThunk('todo/getTodos', async () => {
  const response = await todoApi.getTodos()
  return response
})

export const addTodo = createAsyncThunk('todo/addTodo', async (params: any) => {
  const response = await todoApi.addTodo(params)
  return response
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async (todo: ITodoAPI | any) => {
  const response = await todoApi.updateTodo(todo)
  return response
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (params: IDeleteTodoParams) => {
  const response = await todoApi.deleteTodo(params._id, params.startPage, params.limit, params.filterType)
  return response
})

export const paginateTodos = createAsyncThunk('todo/paginateTodos', async (params: IPaginateParams) => {
  const response = await todoApi.paginateTodos(params.startPage, params.limit, params.filterType)
  return response
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    handleStartPage: (state, action: PayloadAction<IStartPagePayload>) => {
      state.startPage = action.payload.startPage
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.status = 'idle'
      state.todos = action.payload.data
      state.totalTodos = action.payload.totalTodos
    })
    builder.addCase(getTodos.rejected, (state) => {
      state.status = 'failed'
    })

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
    })
    builder.addCase(updateTodo.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(deleteTodo.pending, (state) => {
      state.status = 'loading'
      state.limit -= 1
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.status = 'idle'
      state.todos = action.payload.data.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })
      state.totalTodos = action.payload.totalTodos
      state.limit = action.payload.limit
      state.startPage = action.payload.startPage
    })
    builder.addCase(deleteTodo.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(paginateTodos.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(paginateTodos.fulfilled, (state, action) => {
      state.status = 'idle'
      if (action.payload.data.length === 0) {
        state.todos = []
        state.totalTodos = 0
      } else {
        state.todos = action.payload.data.sort((a, b) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        })
        state.totalTodos = action.payload.totalTodos
        state.startPage = action.payload.startPage
        state.limit = action.payload.limit
      }
      state.filterType = action.payload.filterType
    })
    builder.addCase(paginateTodos.rejected, (state) => {
      state.status = 'failed'
    })
  }
})

export const { handleStartPage } = todoSlice.actions

export default todoSlice.reducer
