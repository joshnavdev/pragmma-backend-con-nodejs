import { ExtractJwt, Strategy } from 'passport-jwt';
import config from './config.js';
import ApiError from './errorApi.js';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
  if (payload.type !== 'ACCESS_TOKEN') {
    throw new ApiError(401, 'Token invalido');
  }

  // Verificar roles
  const user = payload.data;

  done(null, user);
});
