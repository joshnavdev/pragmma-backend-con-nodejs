import passport from 'passport';
import ApiError from '../utils/errorApi.js';

export const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || info || !user) {
      return next(new ApiError(401, 'No autorizado'));
    }

    req.user = user;
    return next();
  })(req, res, next);
};
