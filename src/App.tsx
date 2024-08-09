import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import RootLayout from './components/common/layout/RootLayout';
import Login from './pages/Login';
import Signup from './pages/signup/Signup';
import UserData from './pages/signup/UserData';
import InterestChoice from './pages/signup/InterestChoice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: 'signup',
    element: <RootLayout />,
    children: [
      { index: true, element: <Signup /> },
      { path: 'userdata', element: <UserData /> },
      { path: 'InterestChoice', element: <InterestChoice /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
