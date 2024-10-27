import { useState } from 'react';

function MessageForm({ onSubmit, username, channel }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message) return;

    const messageData = { message, username, channel, datetime: new Date() };
    onSubmit(messageData);
    setMessage('');
  };

  const handleMessageChange = (event) => {
    const newMessage = event.target.value;

    setMessage(newMessage);
  };

  return (
    <div className='absolute bottom-0 left-0 right-0 px-2 py-2 bg-gray-400'>
      <form onSubmit={handleSubmit} className='flex justify-between gap-4'>
        <input type='text' value={message} onChange={handleMessageChange} className='flex-grow py-1 px-4 rounded-xl' />
        <button type='submit' className='rounded bg-black px-4 text-gray-50'>
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageForm;
