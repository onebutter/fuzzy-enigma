import jwt from 'jsonwebtoken';
import models from 'models';
const User = models.User;

export const getUsers = async (req, res) => {
  try {
    const secret = req.app.get('jwt-secret');
    const headerAuths = req.headers.authorization.split(' ');
    if (headerAuths[0] !== 'Bearer') {
      throw new Error('Authorization Header type must be Bearer');
    }
    const decoded = jwt.verify(headerAuths[1], secret);
    console.log(decoded);
    res.json({meh: 'meh'});
  } catch (err) {
    console.log(err);

  }
};

export const createUser = async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    res.statusCode = 201;
    res.json(createdUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
