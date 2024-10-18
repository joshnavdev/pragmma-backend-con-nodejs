import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository.js';
import ApiError from '../utils/errorApi.js';
import config from '../utils/config.js';
import * as authConstants from '../constants/auth.constant.js';
import { OAuth2Client } from 'google-auth-library';
import FederatedCredentialRepository from '../repositories/federatedCredential.repository.js';

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
    this.federatedCredentialRepository = new FederatedCredentialRepository();
    this.oAuth2Client = new OAuth2Client(config.google.clientId, config.google.clientSecret, 'postmessage');
  }

  signup = async (userBody) => {
    const { email, password, confirmPassword } = userBody;
    // Validar si el correo ya existe
    const existedUser = await this.userRepository.getOneByEmail(email);

    if (existedUser) {
      throw new ApiError(400, 'Correo en uso');
    }

    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
      throw new ApiError(400, 'Las contraseñas no coinciden');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, authConstants.SALT_ROUNDS);

    // Crear el usuario
    await this.userRepository.create({ email, password: hashedPassword });
  };

  validatePassword = async (password, hashedPassword) => {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      throw new ApiError(401, 'Credenciales incorrectas');
    }
  };

  validateUser = async (email) => {
    const existedUser = await this.userRepository.getOneByEmail(email);

    if (!existedUser) {
      throw new ApiError(401, 'Credenciales incorrectas');
    }

    return existedUser;
  };

  generateToken = (id, expiresIn, tokenType, data) => {
    const payload = { sub: id, type: tokenType, data };

    return jwt.sign(payload, config.jwt.secret, { expiresIn });
  };

  generateAuthTokens = (user) => {
    const { accessTokenExpiration } = config.jwt;

    const data = { id: user.id, email: user.email };
    const accessToken = this.generateToken(user.id, accessTokenExpiration, authConstants.ACCESS_TOKEN_TYPE, data);

    return { accessToken };
  };

  login = async ({ email, password }) => {
    const existedUser = await this.validateUser(email);

    await this.validatePassword(password, existedUser.password);

    return this.generateAuthTokens(existedUser);
  };

  loginGoogle = async ({ code }) => {
    const { tokens: oAuthTokens } = await this.oAuth2Client.getToken(code);
    const tokenInfo = await this.oAuth2Client.getTokenInfo(oAuthTokens.access_token);
    const { sub, email } = tokenInfo;
    const existedProvider = await this.federatedCredentialRepository.getOneByProviderAndProviderId('google', sub);
    let user;

    if (!existedProvider) {
      user = await this.userRepository.getOneByEmail(email);

      if (!user) {
        user = await this.userRepository.create({ email });
      }

      await this.federatedCredentialRepository.create({ provider: 'google', provider_id: sub, user_id: user.id });
    } else {
      user = await this.userRepository.getById(existedProvider.user_id);
    }

    return this.generateAuthTokens(user);
  };
}

export default AuthService;
