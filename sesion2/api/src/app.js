import express from 'express';
import { requestTime } from './middlewares/request.middleware.js';
import ticketRouter from './routers/ticket.router.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log('Petición recibida', req.requestTime);
  next();
});

app.use(requestTime);

app.use(ticketRouter);

app.listen(3000, () => {
  console.log('Escuchando...');
});
