import Message from '../Message/Message';

function MessageList({ messages = [] }) {
  return (
    <ul className='flex flex-col gap-3 h-[400px] p-4 overflow-auto mb-[50px]'>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </ul>
  );
}

export default MessageList;
