import { useState } from 'react';

const channels = [
  { id: 'channel1', name: 'Channel #1' },
  { id: 'channel2', name: 'Channel #2' },
  { id: 'channel3', name: 'Channel #3' },
  { id: 'channel4', name: 'Channel #4' },
];

export default function ChatHeader({ onJoin, onLeave, channel, username, setChannel, setUsername }) {
  const [isJoined, setIsJoined] = useState(false);

  const handleChannelChange = (event) => {
    setChannel(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleClick = () => {
    if (isJoined) {
      handleLeave();
    } else {
      handleJoin();
    }
  };

  const handleJoin = () => {
    if (!username) return;

    onJoin({ username, channel });
    setIsJoined(true);
  };

  const handleLeave = () => {
    onLeave({ username, channel });
    setIsJoined(false);
  };

  return (
    <header className='flex gap-4 justify-end'>
      <input
        disabled={isJoined}
        type='text'
        placeholder='username'
        className='py-1 px-2 rounded'
        value={username}
        onChange={handleUsernameChange}
      />
      <select
        disabled={isJoined}
        type='text'
        placeholder='username'
        className='py-1 px-2 rounded'
        onChange={handleChannelChange}
        value={channel}
      >
        {channels.map((channel) => (
          <option key={channel.id} value={channel.id}>
            {channel.name}
          </option>
        ))}
      </select>
      <button className='bg-gray-200 px-2 py-1 rounded hover:bg-gray-400' onClick={handleClick}>
        {isJoined ? 'Leave' : 'Join'}
      </button>
    </header>
  );
}
