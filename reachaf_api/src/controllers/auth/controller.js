import models from 'models';
const { User } = models;

export const register = async (req, res) => {
  try {
    await User.create(req.body);
    res.json({ message: 'user created' });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const secret = req.app.get('jwt-secret');
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error({
        status: 404,
        message: 'user not found'
      });
    }
    res.json(user);
  } catch (err) {
    res.status(err.status || 500);
    res.json(err);
  }
};
