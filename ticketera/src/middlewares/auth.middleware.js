import passport from 'passport';
import ApiError from '../utils/errorApi.js';

const verifyCallback = (req, res, next) => (err, user, info) => {
  if (err || info || !user) {
    return next(new ApiError(401, 'No autorizado'));
  }

  req.user = user;
  return next();
};

export const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, verifyCallback(req, res, next))(req, res, next);
};
