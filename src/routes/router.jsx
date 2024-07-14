import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import AuthPage from '../pages/auth/AuthPage'
import LogIn from '../pages/auth/LogIn'
import SignUp from '../pages/auth/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
])
export default router
