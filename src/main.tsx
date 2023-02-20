import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { IconsProvider } from './IconsContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IconsProvider>
      <App />
    </IconsProvider>
  </React.StrictMode>,
);
