import { useEffect } from 'react';
import Chat from '../../components/Chat/Chat';
import Contacts from '../../components/Contacts/Contacts';
import useSocket from '../../hooks/useSocket';
import './App.css';

function App() {
  const socket = useSocket();

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <main className='h-screen flex justify-center items-center bg-gray-800 gap-4'>
        <Contacts />
        <Chat />
      </main>
    </>
  );
}

export default App;
