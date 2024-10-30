import { Sequelize } from 'sequelize';
import config from './config.js';

export const db = new Sequelize({ ...config.database, logging: false });

export const initDatabase = async () => {
  try {
    await db.authenticate();
    console.log('Conectado a la base de datos');

    if (config.env === 'development') {
      await db.sync({ force: true });
      console.log('Base de datos sincronizada FORCE');
    } else {
      await db.sync();
      console.log('Base de datos sincronizada');
    }
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};
