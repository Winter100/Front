import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import RootLayout from './components/common/layout/RootLayout';
import Login from './pages/Login';
import Signup from './pages/signup/Signup';
import InterestChoice from './pages/signup/InterestChoice';
import ProfileImageUploader from './pages/signup/ProfileImageUploader';
import Profile from './pages/signup/Profile';
import AuthCredential from './pages/signup/AuthCredential';
import Gender from './pages/signup/Gender';
import SignupLayout from './components/common/layout/SignupLayout';

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
    element: <SignupLayout />,
    children: [
      { index: true, element: <Signup /> },
      { path: 'credential', element: <AuthCredential /> },
      { path: 'gender', element: <Gender /> },
      { path: 'interestChoice', element: <InterestChoice /> },
      { path: 'profile', element: <Profile /> },
      { path: 'profileImageUploader', element: <ProfileImageUploader /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
