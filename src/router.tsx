import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import CreatePasswordPage from './pages/CreatePasswordPage'
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />
  },
  {
    path: "/create-password",
    element: <CreatePasswordPage />
  },
]);

export default router;
