import associations from './associations.js';
import crud from './crud.js';
import { db } from './db.js';

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');

  // Solo debe ser usado en DEV
  await db.sync({ force: true }); // Que me destruya todas las tablas y las vuelva a crear

  // await crud();
  await associations();
} catch (error) {
  console.error(error);
}
