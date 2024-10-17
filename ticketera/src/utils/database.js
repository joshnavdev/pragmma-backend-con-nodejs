import { Sequelize } from 'sequelize';
import config from './config.js';

export const db = new Sequelize({ ...config.database, logging: false });
