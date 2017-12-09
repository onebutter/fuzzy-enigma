import Sequelize from 'sequelize';
import config from './config';
import { syncModels } from './models';

export default async cb => {
  console.log('init db...');
  const { database, password, username } = config.database;
  const sequelize = new Sequelize(
    `postgresql://${username}:${password}@db/${database}`
  );
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.error('[sequelize] Unable to connect to the database: ', err);
  }
  console.log('[sequelize] sequelize test connection was successful');
  console.log('[sequelize] importing models');
  syncModels(sequelize);
  console.log('[sequelize] model importing finished, sync to DB');
  try {
    await sequelize.sync();
  } catch (err) {
    console.error('[sequelize] sync() failed');
  }
  console.log('[sequelize] sync successful');
  cb(sequelize);
};
