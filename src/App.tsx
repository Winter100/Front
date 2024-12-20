import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import Home from './pages/home/Home';
import Matching from './pages/match/Matching';
import Messages from './pages/match/message/Messages';
import My from './pages/match/my/My';
import RootLayout from './components/layout/RootLayout';
import MatchLayout from './components/layout/MatchLayout';
import ChattingLayout from './components/layout/ChattingLayout';
import Chatting from './pages/chatting/Chatting';
import Login from './pages/login/Login';
import SignupLayout from './components/layout/SignupLayout';
import AuthCredential from './pages/signup/credential/AuthCredential';
import Profile from './pages/signup/setting/profile/Profile';
import ProfileImageUploader from './pages/signup/setting/profileImageUploader/ProfileImageUploader';
import HomeLayout from './components/layout/HomeLayout';

import ProfileEditLayout from './components/layout/ProfileEditLayout';
import Edit from './pages/profile/edit/Edit';
import LoginLayout from './components/layout/LoginLayout';
import Callback from './pages/callback/Callback';
import CallbackLayout from './components/layout/CallbackLayout';
import Address from './pages/signup/setting/address/Address';
import ProtectedRouteWithProfile from './components/ProtectedRoute/ProfileProtectedRoute';
import LoginProtectedRoute from './components/ProtectedRoute/LoginProtectedRoute';
import PublicRoute from './components/ProtectedRoute/PublicRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <HomeLayout />,
        path: '/',
        children: [{ index: true, element: <Home /> }],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: 'login',
            element: <LoginLayout />,
            children: [{ index: true, element: <Login /> }],
          },
        ],
      },
      {
        element: <ProtectedRouteWithProfile />,
        children: [
          {
            path: 'match',
            element: <MatchLayout />,
            children: [
              { index: true, element: <Matching /> },
              {
                path: 'messages',
                element: <Messages />,
              },
              { path: 'my', element: <My /> },
            ],
          },
          {
            path: 'chatting/:id',
            element: <ChattingLayout />,
            children: [{ index: true, element: <Chatting /> }],
          },
          {
            path: 'profile-edit',
            element: <ProfileEditLayout />,
            children: [{ index: true, element: <Edit /> }],
          },
        ],
      },
      {
        path: 'signup',
        element: <SignupLayout />,
        children: [
          { path: 'credential', element: <AuthCredential /> },
          {
            path: 'setting',
            element: <LoginProtectedRoute />,
            children: [
              { path: 'profile', element: <Profile /> },
              {
                path: 'profileImageUploader',
                element: <ProfileImageUploader />,
              },
              { path: 'address', element: <Address /> },
            ],
          },
        ],
      },

      {
        path: 'callback',
        element: <CallbackLayout />,
        children: [{ index: true, element: <Callback /> }],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
