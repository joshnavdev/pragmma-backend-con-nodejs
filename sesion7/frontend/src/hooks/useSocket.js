import { useContext } from 'react';
import { SocketContext } from '../contexts/socket.context';

export default function useSocket() {
  return useContext(SocketContext);
}
