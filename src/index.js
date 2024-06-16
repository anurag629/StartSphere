import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { Flowbite } from "flowbite-react";
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Flowbite>
      <App />
    </Flowbite>
  </Provider>
);

reportWebVitals(sendToVercelAnalytics);