import UserService from '../services/user.service.js';
import client from '../utils/redis.js';

// No es buena practica, hacerlo por medio de DI Container
const userService = new UserService(client);
// container.get(UserService.name)

export default function registerChannelEvents(io, socket) {
  const joinChannel = async ({ username, channel }) => {
    console.log(`Usuario ${username} se ha unido al canal ${channel}`);
    socket.join(channel); // -> Indicamos que el socket se una a un canal en especifico

    // Guardamos el usuario en redis
    await userService.addToChannel(channel, { username, id: socket.id });
    const channelUsers = await userService.findAllFromChannel(channel);

    // io.emit('nombreEvento', data) -> Emite a todos los sockets
    io.to(channel).emit('updateUsers', channelUsers); // -> Emite a todos los sockets en un canal en especifico

    socket.to(channel).emit('notifyMessage', `${username} se ha unido al canal`); // TODO
  };

  const leaveChannel = async ({ username, channel }) => {
    console.log(`Usuario ${username} ha abandonado el canal ${channel}`);

    await userService.removeFromChannel(channel, socket.id);
    const users = await userService.findAllFromChannel(channel);

    io.to(channel).emit('updateUsers', users);
    socket.to(channel).emit('notifyMessage', `${username} ha salido del canal`); // TODO
    socket.leave(channel);
  };

  socket.on('joinChannel', joinChannel);
  socket.on('leaveChannel', leaveChannel);
}
