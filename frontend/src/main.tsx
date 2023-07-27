import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from 'App'
import { Auth, TodoList } from '@screens'
import { NotFound } from './components'
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/register', element: <Auth type='Register' /> },
      { path: '/', element: <Auth type='Login' /> },
      { path: '/todo-list', element: <TodoList /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
