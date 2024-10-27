import { io, server } from './app.js';
import client from './utils/redis.js';
import socket from './utils/socket.js';

try {
  await client.connect();
  console.log('Conectado a REDIS');

  socket(io);

  server.listen(3000, () => {
    console.log('Server on port 3000');
  });
} catch (error) {
  console.error(error);
}
