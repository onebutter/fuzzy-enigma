import { Op } from 'sequelize';
import models from 'models';

const { Namecard } = models;

export default async (req, res) => {
  try {
    const { id } = req.requestingUser;
    let data = req.body;
    if (data.services.length + data.aliases.length === 0) {
      throw new Error('At least one service or one alias is required');
    }
    data['UserId'] = id;
    const numNamecard = await Namecard.count({ where: { UserId: id } });
    if (numNamecard !== req.requestingUser.numNamecard) {
      throw new Error(
        'count of existing namecards and numNamecard do not match'
      );
    }

    if (numNamecard === 0) {
      data['privacy'] = 'default';
    } else {
      if (data.privacy === 'default') {
        await updateExistingDefaultToPublic(id, namecard);
      }
    }
    const namecard = await Namecard.create(data);
    await req.requestingUser.increment('numNamecard', { by: 1 });
    res.json(namecard);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      errors: err
    });
  }
};

const updateExistingDefaultToPublic = async UserId => {
  const defaultNamecard = await Namecard.findOne({
    where: {
      UserId,
      privacy: 'default'
    }
  });
  defaultNamecard.privacy = 'public';
  await defaultNamecard.save();
};
