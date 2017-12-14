import models from 'models';
const User = models.User;

export const getUsers = async (req, res) => {
  try {
    const { id } = req.tokenPayload;
    // TODO this should be findAll
    let user = await User.findById(id);
    user = user.applyRole();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createUser = async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    res.statusCode = 201;
    res.json(createdUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
