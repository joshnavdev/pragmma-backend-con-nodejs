export default function registerMessageEvents(io, socket) {
  const handleSendMessage = ({ channel, ...payload }) => {
    console.log({ channel, payload });
    io.to(channel).emit('singleMessage', { ...payload, userId: socket.id });
  };

  socket.on('sendMessage', handleSendMessage);
}
