import models from 'models';
const User = models.User;

export const getUsers = async (req, res) => {
  const usersCount = await User.count();
  console.log(usersCount);
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
