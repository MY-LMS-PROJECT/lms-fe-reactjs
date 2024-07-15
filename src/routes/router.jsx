import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import AuthPage from '../pages/auth/AuthPage'
import LogIn from '../pages/auth/LogIn'
import SignUp from '../pages/auth/SignUp'
import LogOut from '@src/pages/auth/LogOut'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
  {
    path: '/auth',
    element: <AuthPage />,
    children: [
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
