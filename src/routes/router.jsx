import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import AuthPage from '../pages/auth/AuthPage'
import LogIn from '../pages/auth/LogIn'
import SignUp from '../pages/auth/SignUp'
import LogOut from '@src/pages/auth/LogOut'
import Err404 from '@src/pages/errors/Err404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Err404 />,
    children: [],
  },
  {
    path: '/auth',
    element: <AuthPage />,
    children: [
      {
        index: true,
        element: <Navigate to={'login'} />,
      },
      {
        path: 'login',
        element: <LogIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/auth/logout',
    element: <LogOut />,
  },
])
export default router
