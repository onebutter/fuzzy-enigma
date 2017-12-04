import Sequelize from 'sequelize';
import config from './config';

const initDb = async callback => {
  console.log('init db...');
  const { database, password, username } = config.database;
  const sequelize = new Sequelize(
    `postgresql://${username}:${password}@db/${database}`
  );
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.error('Unable to connect to the database: ', err);
  }
  console.log('sequelize test connection was successful');
  callback();
};

export default initDb;
