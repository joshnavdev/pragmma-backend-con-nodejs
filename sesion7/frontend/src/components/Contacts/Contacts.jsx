import { useEffect, useState } from 'react';
import ContactList from '../ContactList/ContactList';
import useSocket from '../../hooks/useSocket';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    const handleNewContactsEvent = (contacts) => {
      console.log(contacts);
      setContacts([...contacts]);
    };

    // 3. Escucha un evento cuando se actualiza la lista de usuarios conectados
    socket.on('updateUsers', handleNewContactsEvent);

    return () => {};
  });

  return (
    <div className='h-[490px] text-white flex flex-col gap-4'>
      <h1 className='text-[16px]'>Contactos conectados</h1>
      <ContactList contacts={contacts} />
    </div>
  );
}

export default Contacts;
