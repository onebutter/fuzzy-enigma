import concat from 'lodash/fp/concat';
import models from 'models';
import {
  da_namecardsBelongsToUserid,
  da_privateNamecardsBelongsToUserid
} from './dataAccess';
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

  if (req.requestingUser) {
    getNamecardsWithAuth(req, res);
  } else {
    getNamecardsWithoutAuth(req, res);
  }
};

const getNamecardsWithAuth = async (req, res) => {
  try {
    const requestingUser = req.requestingUser;
    if (!requestingUser) {
      return res.status(401).json({
        message:
          'requesting user (implied from the access token) does not exist'
      });
    }

    if (requestingUser.isAdmin()) {
      return admin_getNamecards(req, res);
    }

    if (isRequestingForOwn(requestingUser, req.query)) {
      const namecards = await da_namecardsBelongsToUserid(requestingUser.id, [
        'default',
        'public',
        'private',
        'secret'
      ]);
      return res.json(namecards);
    }

    // at this point, either query.id xor query.username is available
    // hence, it has the same operation as non-authorized access
    getNamecardsWithoutAuth(req, res);
  } catch (err) {
    res.json(err.message);
  }
};

const getNamecardsWithoutAuth = async (req, res) => {
  try {
    const queriedUser = req.query.userid
      ? await User.findById(req.query.userid)
      : await User.findOne({ where: { username: req.query.username } });

    if (!queriedUser) {
      return res
        .status(404)
        .json({ message: 'no user found with the given query' });
    }

    const namecards = await da_namecardsBelongsToUserid(queriedUser.id, [
      'default',
      'public'
    ]);
    const privateNamecards = await da_privateNamecardsBelongsToUserid(
      queriedUser.id
    );
    return res.json(concat(namecards, privateNamecards));
  } catch (err) {
    res.json(err.message);
  }
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
