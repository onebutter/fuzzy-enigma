import models from 'models';
import { sampleData, genSampleNamecard } from './sampleData';
const { User, Namecard } = models;

export default async cb => {
  const { sequelize } = models;
  try {
    await sequelize.sync({ force: true });
  } catch (err) {
    console.error('[sequelize] error in sync model', err);
  }
  cb();
};

export const populateWithSampleData = async () => {
  for (const sampleUser of sampleData.users) {
    const createdUser = await User.create(sampleUser);
    const privacyList = ['default', 'public', 'private', 'secret', 'public'];
    for (let x = 0; x < 5; x++) {
      const createdNamecard = await Namecard.create({
        ...genSampleNamecard(sampleUser.username),
        privacy: privacyList[x]
      });
      await createdUser.addNamecard(createdNamecard);
    }
    createdUser.numNamecard = 5;
    await createdUser.save();
  }
};
