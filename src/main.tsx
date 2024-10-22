import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import TanstackProvider from './providers/TanstackProvider.tsx';
import ContextProvider from './providers/ContextProvider.tsx';

import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from './providers/ToastProvider.tsx';

const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // return worker.start();
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <TanstackProvider>
        <ToastProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </ToastProvider>
      </TanstackProvider>
    </React.StrictMode>
  );
});
