import models from 'models';

const { Namecard } = models;

export default async (req, res) => {
  const targetId = req.params.namecardId;
  const targetNc = await Namecard.findById(targetId);
  if (!targetNc) {
    return res.status(404).json({
      code: 'INVALID_ID',
      message: `No Namecard exists with this ID: ${targetId}`
    });
  }

  if (req.requestingUser.isAdmin()) {
    return res.status(200).json(targetNc);
  }

  if (targetNc.UserId !== req.requestingUser.id) {
    return res.status(403).json({
      code: 'DELETE_NOT_ALLOWED',
      message: "you are trying to delete someone else's namecard"
    });
  }

  if (targetNc.privacy === 'default') {
    const publicNc = await Namecard.findOne({
      where: {
        privacy: 'public'
      }
    });
    if (publicNc) {
      publicNc.privacy = 'default';
      await publicNc.save();
    }
  }

  const result = await targetNc.destroy();
  res.json(result);
};
