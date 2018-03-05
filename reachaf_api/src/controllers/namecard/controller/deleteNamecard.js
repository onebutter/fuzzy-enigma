import { Op } from 'sequelize';
import models from 'models';

const { User, Namecard } = models;

export default async (req, res) => {
  console.log(req);
  res.json({
    message: 'temp'
  });
}