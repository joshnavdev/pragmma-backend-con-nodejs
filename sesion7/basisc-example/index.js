import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import path from 'path';
import { Server } from 'socket.io';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Un usuario entro', socket.id);

  socket.on('sendMessage', (data) => {
    console.log(data);
    // Guardo el mensaje en BD
    // Envio el mensaje a todos los usuarios
    io.emit('message', `${socket.id}: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Un usuario salio', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
