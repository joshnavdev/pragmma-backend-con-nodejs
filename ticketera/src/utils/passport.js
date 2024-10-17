import { ExtractJwt, Strategy } from 'passport-jwt';
import config from './config.js';
import * as authConstants from '../constants/auth.constant.js';
import ApiError from './errorApi.js';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

const jwtVerify = async (payload, done) => {
  if (payload.type !== authConstants.ACCESS_TOKEN_TYPE) {
    throw new ApiError(401, 'Token invalido');
  }

  const user = payload.data;

  done(null, user);
};

export const jwtStrategy = new Strategy(jwtOptions, jwtVerify);
