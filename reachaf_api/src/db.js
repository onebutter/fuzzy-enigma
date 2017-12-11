import models from 'models';

export default async cb => {
  const { sequelize } = models;
  try {
    await sequelize.sync();
  } catch (err) {
    console.error('[sequelize] error in sync model', err);
  }
  cb();
};
