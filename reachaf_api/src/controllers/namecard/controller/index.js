import models from 'models';
import { da_namecardsBelongsToUserid } from './dataAccess';
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
        privacy: 'default'
      });
    } else {
      namecard = await Namecard.create(req.body);
    }
    await user.addNamecard(namecard);
    await user.increment('numNamecard', { by: 1 });
    res.json(namecard);
  } catch (err) {
    res.json(err.message);
  }
};

export const getNamecards = async (req, res) => {
  if (req.query && req.query.userid && req.query.username) {
    return res.json({
      message: 'You cannot query for both userid and username.'
    });
  }

  if (req.tokenPayload && req.tokenPayload.id) {
    getNamecardsWithAuth(req, res);
  } else {
    getNamecardsWithoutAuth(req, res);
  }
};

const getNamecardsWithAuth = async (req, res) => {
  try {
    const { id } = req.tokenPayload;
    const requestingUser = await User.findById(id);
    if (!requestingUser) {
      return res.status(401).json({ message: 'token user does not exist' });
    }

    if (requestingUser.isAdmin()) {
      return admin_getNamecards(req, res);
    }

    if (isRequestingForOwn(requestingUser, req.query)) {
      const namecards = await da_namecardsBelongsToUserid(id, [
        'default',
        'public',
        'private',
        'secret'
      ]);
      return res.json(namecards);
    }

    // at this point, either query.id xor query.username is available
    if (req.query.userid || req.query.username) {
      const arg = req.query.username ? req.query.username : req.query.userid;
      const namecards = await da_namecardsBelongsToUserid(arg, [
        'default',
        'public'
      ]);
      return res.json(namecards);
    }

    res.json({
      message:
        'future implementation for requesting for others, also admin control'
    });
  } catch (err) {
    res.json(err.message);
  }
};

const getNamecardsWithoutAuth = async (req, res) => {
  return res.json({ message: 'TODO: noob access' });
};

const admin_getNamecards = async (req, res) => {
  return res.json({ message: 'TODO: admin retrieves everything' });
};

const isRequestingForOwn = (tokenUser, query) => {
  if (!query) {
    return true;
  }

  if (!query.username && !query.userid) {
    return true;
  }

  return query.username === tokenUser.username || query.userid === tokenUser.id;
};
