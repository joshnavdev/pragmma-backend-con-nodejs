import { io } from 'socket.io-client';
import { SocketContext } from '../contexts/socket.context';

const SocketProvider = ({ children }) => {
  const socket = io('http://localhost:3000/', {
    autoConnect: false,
  });

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
