import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: '*' } });

// Aqui van todas nuestras configuracion de express
// ROutes
// middlewares
// Cors

app.get('/', (req, res) => {
  res.send('Hello World');
});
