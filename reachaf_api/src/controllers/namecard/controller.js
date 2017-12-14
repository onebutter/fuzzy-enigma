import models from 'models';
const { User, Namecard } = models;

export const createNamecard = async (req, res) => {
  const { id } = req.tokenPayload;
  const user = await User.findById(id);
  let namecard = await Namecard.create(req.body);
  await user.addNamecard(namecard);
  namecard = await Namecard.findById(namecard.id);
  res.json(namecard);
};
