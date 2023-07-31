import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from 'App'
import { store } from 'app/store'
import { NotFound } from '@components'
import { Auth, TodoList } from '@screens'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <TodoList /> },
      { path: '/register', element: <Auth type='Register' /> },
      { path: '/login', element: <Auth type='Login' /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
