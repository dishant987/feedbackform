
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import FeedBack from './components/FeedBack';
import ProtectedRoute from './components/ProtectedRoute';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/admin',
    element: <AdminLogin />
  },
  {
    path: '/feedback',
    element: <ProtectedRoute component={FeedBack} />
  }
]);


function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
