import registerChannelEvents from '../events/channel.events.js';
import registerGeneralEvents from '../events/general.events.js';
import registerMessageEvents from '../events/message.events.js';

const socket = (io) => {
  const onConnection = async (socket) => {
    // Manejador del evento connection
    console.log('Nueva conexion', socket.id);

    // Registro todos mis eventos
    registerChannelEvents(io, socket);
    registerMessageEvents(io, socket);
    registerGeneralEvents(io, socket);
  };

  io.on('connection', onConnection);
};

export default socket;
