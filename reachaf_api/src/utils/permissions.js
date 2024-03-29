import jwt from 'jsonwebtoken';
import models from 'models';
const { User } = models;

// Logic in this file is funky.. authRequired and addTokenPayload do the same checks
export const authRequired = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'This route requires auth'
    });
  }

  const headerAuths = req.headers.authorization.split(' ');
  if (headerAuths.length !== 2 || headerAuths[0] !== 'Bearer') {
    return res.status(401).json({
      message:
        'Check request authorization header. It should be `Bearer ${token}`'
    });
  }

  const secret = req.app.get('jwt-secret');
  try {
    req.tokenPayload = await jwt.verify(headerAuths[1], secret);
    const foundUser = await User.findById(req.tokenPayload.id);
    if (!foundUser) {
      return res.status(401).json({
        message: `no user was found with the implied userid : ${
          req.tokenPayload.id
        }`
      });
    }
    req.requestingUser = foundUser;
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
  next();
};

export const addRequestingUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }
  const headerAuths = req.headers.authorization.split(' ');
  if (headerAuths.length !== 2 || headerAuths[0] !== 'Bearer') {
    return next();
  }

  const secret = req.app.get('jwt-secret');
  let tokenPayload;
  try {
    tokenPayload = await jwt.verify(headerAuths[1], secret);
  } catch (err) {
    return res.status(401).json({
      message: err.message,
      payload: headerAuths
    });
  }
  const foundUser = await User.findById(tokenPayload.id);
  if (foundUser && foundUser.username === tokenPayload.username) {
    req.tokenPayload = tokenPayload;
    req.requestingUser = foundUser;
    next();
  } else {
    return res.status(401).json({
      message: 'token implied userid does not match the database userid'
    });
  }
};
