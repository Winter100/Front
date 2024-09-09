import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import Home from './pages/home/Home';
import MatchingProfile from './pages/match/MatchingProfile';
import Messages from './pages/match/message/Messages';
import My from './pages/match/my/My';
import RootLayout from './components/layout/RootLayout';
import MatchLayout from './components/layout/MatchLayout';
import ChattingLayout from './components/layout/ChattingLayout';
import Chatting from './pages/chatting/Chatting';
import Login from './pages/login/Login';
import SignupLayout from './components/layout/SignupLayout';
import Signup from './pages/signup/Signup';
import AuthCredential from './pages/signup/credential/AuthCredential';
import Gender from './pages/signup/setting/gender/Gender';
import InterestChoice from './pages/signup/setting/interestChoice/InterestChoice';
import Profile from './pages/signup/setting/profile/Profile';
import ProfileImageUploader from './pages/signup/setting/profileImageUploader/ProfileImageUploader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'match',
        element: <MatchLayout />,
        children: [
          { index: true, element: <MatchingProfile /> },
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
        path: 'signup',
        element: <SignupLayout />,
        children: [
          { index: true, element: <Signup /> },
          { path: 'credential', element: <AuthCredential /> },
          {
            path: 'setting',
            children: [
              { path: 'gender', element: <Gender /> },
              { path: 'interestChoice', element: <InterestChoice /> },
              { path: 'profile', element: <Profile /> },
              {
                path: 'profileImageUploader',
                element: <ProfileImageUploader />,
              },
            ],
          },
        ],
      },
      { path: 'login', element: <Login /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
