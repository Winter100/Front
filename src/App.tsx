import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import RootLayout from './components/common/layout/RootLayout';
import Home from './pages/Home';
import MatchingProfile from './pages/MatchingProfile';
import Messages from './pages/Messages';
import MatchLayout from './components/common/layout/MatchLayout';
import Chatting from './pages/Chatting';
import ChattingLayout from './components/common/layout/ChattingLayout';

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
        ],
      },
      {
        path: 'chatting/:id',
        element: <ChattingLayout />,
        children: [{ index: true, element: <Chatting /> }],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
