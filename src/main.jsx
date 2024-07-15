import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { StateProvider } from './contexts/StateProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider>
      <RouterProvider router={router} />
    </StateProvider>
  </React.StrictMode>,
)

