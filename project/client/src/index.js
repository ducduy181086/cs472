import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { StateProvider } from './store/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateProvider>
    <App />
  </StateProvider>
);
