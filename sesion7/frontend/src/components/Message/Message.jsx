import moment from 'moment';

function Message({ message }) {
  const { message: text, username, datetime, isOwnMessage: right = true } = message;

  const time = moment(datetime).format('h:mm A');

  const messageClass = right ? 'justify-end' : 'justify-start';
  const messageBgColor = right ? 'bg-[#d9fdd3]' : 'bg-white';

  return (
    <div className={`flex ${messageClass}`}>
      <div className={`max-w-[200px] ${messageBgColor} px-2 py-1 rounded`}>
        <div className=' flex gap-2'>
          <span className='text-[14px] font-bold'>{username}</span>
          <span className='text-[11px] text-gray-700'>{time}</span>
        </div>
        <div className='flex gap-1 relative mb-[10px]'>
          <span className='text-[14px]'>{text}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
