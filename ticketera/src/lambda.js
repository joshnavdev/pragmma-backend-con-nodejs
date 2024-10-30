import 'dotenv/config';
import './initContainer.js';
import swaggerUi from 'swagger-ui-express';
import swaggerParser from '@apidevtools/swagger-parser';
import serverlessExpress from '@vendia/serverless-express';
import app from './app.js';
import { initDatabase } from './utils/database.js';
import './models/index.js';

let serverlessExpressInstance;

const setup = async (event, context) => {
  try {
    await initDatabase();

    const swaggerDocument = await swaggerParser.bundle('src/swagger/swagger.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    serverlessExpressInstance = serverlessExpress({ app });
    return serverlessExpressInstance(event, context);
  } catch (error) {
    console.error(error);
  }
};

export const handler = (event, context) => {
  console.log(process.env);
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context);

  return setup(event, context);
};
