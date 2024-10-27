import UserService from '../services/user.service.js';
import client from '../utils/redis.js';

const userService = new UserService(client);

export default function registerGeneralEvents(io, socket) {
  const handleDisconnect = async () => {
    console.log('Usuario desconectado', socket.id);

    await userService.removeFromAllChannels(socket.id, (channel, users) => {
      io.to(channel).emit('updateUsers', users);
      socket.leave(channel);
    });
  };

  socket.on('disconnect', handleDisconnect);
}
