import models from 'models';
const { User, Namecard } = models;

export const createNamecard = async (req, res) => {
  try {
    const { id } = req.tokenPayload;
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: `user not found with id: ${id}`
      });
    }
    const existingNamecardCount = await Namecard.count({
      where: { UserId: id }
    });
    let namecard;
    if (existingNamecardCount === 0) {
      namecard = await Namecard.create({
        ...req.body,
        privacy: 'public',
        isDefaultNamecard: true
      });
    } else {
      namecard = await Namecard.create(req.body);
    }
    await user.addNamecard(namecard);
    await user.increment('numNamecard', { by: 1 });
    res.json(namecard);
  } catch (err) {
    res.json(err);
  }
};

export const getNamecards = async (req, res) => {
  try {
    const { id } = req.tokenPayload;
    const namecards = await Namecard.findAll({ where: { UserId: id } });
    res.json(namecards);
  } catch (err) {
    res.json(err);
  }
};
