import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { UserProvider } from "./components/UserContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </React.StrictMode>
);


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}

// navigator.serviceWorker.ready.then(registration => {
//   registration.active.postMessage({ type: 'PING' });
// });

// navigator.serviceWorker.onmessage = event => {
//   console.log('Received message from Service Worker:', event.data);
// };