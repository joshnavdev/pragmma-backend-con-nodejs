import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { requestTime } from './middlewares/request.middleware.js';
import appRouter from './routers/index.js';
import { errorConverter, errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Logs
app.use(morgan('dev'));

// Seguridad
app.use(cors());

// Business
app.use(express.json());
app.use(requestTime);

app.use(appRouter);
app.use(errorConverter);
app.use(errorHandler);

export default app;
