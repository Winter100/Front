import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import TanstackProvider from './providers/TanstackProvider.tsx';
import ContextProvider from './providers/ContextProvider.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start();
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <TanstackProvider>
        <ContextProvider>
          <App />
          <ToastContainer />
        </ContextProvider>
      </TanstackProvider>
    </React.StrictMode>
  );
});
