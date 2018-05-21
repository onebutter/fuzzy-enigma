import models from 'models';
import actionFulfilment from 'utils/serviceAction';

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
    if (numNamecard === 0) {
      data['privacy'] = 'default';
    } else {
      if (data.privacy === 'default') {
        await updateExistingDefaultToPublic(id, namecard);
      }
    }
    data.services = actionFulfilment(data.services);
    const namecard = await Namecard.create(data);
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
