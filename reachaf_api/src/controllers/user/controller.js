import models from 'models';
const User = models.User;

export const getUsers = async (req, res) => {

  const usersCount = await User.count();
  console.log(usersCount);

};

export const createUser = async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    console.log('creating user', createdUser);
    res.statusCode = 201;
    res.json(createdUser);
  } catch (err) {
    console.log('error happend', err);
    res.json(err);
  }
};

export const register = async (req, res) => {
  
};