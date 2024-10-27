import { useEffect, useState } from 'react';
import MessageForm from '../MessageForm/MessageFOrm';
import MessageList from '../MessageList/MessageList';
import useSocket from '../../hooks/useSocket';
import ChatHeader from '../ChatHeader/ChatHeader';

function Chat() {
  const [messages, setMessage] = useState([]);
  const [channel, setChannel] = useState('channel1');
  const [username, setUsername] = useState('');
  const socket = useSocket();

  const handleMessageSubmit = (messagePayload) => {
    // 2. Emite un evento cuando el usuario envia un mensaje
    // mensaje, tiempo, canal, usuario, userId
    socket.emit('sendMessage', messagePayload);
  };

  useEffect(() => {
    const handleSingleMessageEvent = (message) => {
      console.log({ message });
      const newMessage = {
        ...message,
        isOwnMessage: message.userId === socket.id,
      };

      setMessage([...messages, newMessage]);
    };

    // 3. Escucha un evento cuando se envia un mensaje simple
    socket.on('singleMessage', handleSingleMessageEvent);

    return () => {
      socket.off('singleMessage', handleSingleMessageEvent);
    };
  });

  const handleJoin = (joinPayload) => {
    // 1. Se emite cuando el usuario da click en el boton Join
    // { username: 'joshua', channel: 'channel1' }
    socket.emit('joinChannel', joinPayload);
  };

  const handleLeave = (leavePayload) => {
    // Se emite cuando el usuario da click en el boton Leave
    socket.emit('leaveChannel', leavePayload);
  };

  return (
    <div className='flex flex-col gap-4 text-center'>
      <ChatHeader
        onJoin={handleJoin}
        onLeave={handleLeave}
        username={username}
        channel={channel}
        setChannel={setChannel}
        setUsername={setUsername}
      />
      <div className='bg-[#efeae2] w-[800px] rounded-lg relative shadow-xl overflow-hidden'>
        <MessageList messages={messages} />
        <MessageForm username={username} channel={channel} onSubmit={handleMessageSubmit} />
      </div>
    </div>
  );
}

export default Chat;
