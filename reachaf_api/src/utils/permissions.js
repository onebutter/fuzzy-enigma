import jwt from 'jsonwebtoken';

export const authRequired = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      message: 'This route requires auth'
    });
  }

  const headerAuths = req.headers.authorization.split(' ');
  if (headerAuths.length !== 2 || headerAuths[0] !== 'Bearer') {
    res.status(401).json({
      message:
        'Check request authorization header. It should be Bearer ${token}'
    });
  }

  const secret = req.app.get('jwt-secret');
  try {
    req.tokenPayload = await jwt.verify(headerAuths[1], secret);
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
  next();
};
