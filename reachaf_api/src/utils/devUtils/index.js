import express from 'express';
import models from 'models';
import { sampleData, genSampleNamecard } from './sampleData';
const { User, Namecard } = models;

const router = express.Router();


const purgedb = async (req, res) => {
  try {
    const opt = { force: true, cascade: true };
    await Namecard.truncate(opt);
    await User.truncate(opt);
    res.status(200).json({ message: 'purged your db' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const populateWithSampleData = async (req, res) => {
  try {
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
    res.status(200).json({ message: 'populated with sample data' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

router.get('/purgedb', purgedb);
router.get('/populatedb', populateWithSampleData);

export default router;
