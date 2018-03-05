import { Op } from 'sequelize';
import models from 'models';

const { Namecard } = models;

export default async (req, res) => {
  try {
    const { numNamecard, id } = req.requestingUser;
    let data = req.body;
    if (data.services.length + data.aliases.length === 0) {
      throw new Error('At least one service or one alias is required');
    }
    data['UserId'] = id;
    if (numNamecard === 0) {
      data['privacy'] = 'default';
    }
    const namecard = await Namecard.create(data);
    if (data.privacy === 'default' && numNamecard > 0) {
      await da_updateExistingDefaultToPublic(id, namecard);
    }
    await req.requestingUser.increment('numNamecard', { by: 1 });
    res.json(namecard);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      errors: err
    });
  }
};

const da_updateExistingDefaultToPublic = async (UserId, newDefaultNamecard) => {
  const defaultNamecard = await Namecard.findOne({
    where: {
      id: {
        [Op.ne]: newDefaultNamecard.id
      },
      UserId,
      privacy: 'default'
    }
  });
  defaultNamecard.privacy = 'public';
  await defaultNamecard.save();
};
