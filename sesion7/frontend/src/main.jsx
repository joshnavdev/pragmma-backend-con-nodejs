import { createRoot } from 'react-dom/client';
import './index.css';
import App from './views/App/App.jsx';
import SocketProvider from './providers/socket.provider';

createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
