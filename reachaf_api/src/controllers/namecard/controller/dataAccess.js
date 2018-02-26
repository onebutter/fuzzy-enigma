import { Op } from 'sequelize';
import models from 'models';
const { Namecard } = models;

export const da_namecardsBelongsToUserid = async (UserId, privacy) => {
  const namecards = await Namecard.findAll({
    where: {
      UserId,
      privacy: {
        [Op.in]: privacy
      }
    }
  });
  return namecards;
};
