import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerParser from '@apidevtools/swagger-parser';
import { requestTime } from './middlewares/request.middleware.js';
import appRouter from './routers/index.js';
import ApiError from './utils/errorApi.js';
import { errorConverter, errorHandler } from './middlewares/error.middleware.js';
import config from './utils/config.js';

const app = express();

try {
  const swaggerDocument = await swaggerParser.bundle('src/swagger/swagger.yaml');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.error(error);
}

// Logs
app.use(morgan('dev'));

// Seguridad
app.use(cors());

// Business
app.use(express.json());
app.use(requestTime);

app.use(appRouter);

app.get('/testError', (req, res, next) => {
  // throw new Error('Error de prueba');
  setTimeout(() => {
    next(new Error('Error de prueba'));
  }, 500);
});

app.get('/serverError', (req, res, next) => {
  fs.readFile('123123187.json', (error, data) => {
    if (error) {
      return next(error);
    }

    res.send(data);
  });
});

app.get('/businessError', (req, res, next) => {
  setTimeout(() => {
    return next(new ApiError(400, 'Error de negocio'));
  });
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Escuchando en el puerto ${config.port}`);
});
