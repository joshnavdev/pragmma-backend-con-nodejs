import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository.js';
import ApiError from '../utils/errorApi.js';
import config from '../utils/config.js';

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_TYPE = 'ACCESS_TOKEN';

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
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
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

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

  generateToken = (id, expiresInMinutes, tokenType, data) => {
    const payload = { sub: id, type: tokenType, data };

    return jwt.sign(payload, config.jwt.secret, { expiresIn: `${expiresInMinutes}` });
  };

  generateAuthTokens = (user) => {
    const { accessTokenExpirationMinutes } = config.jwt;

    const data = { id: user.id, email: user.email };
    const accessToken = this.generateToken(user.id, accessTokenExpirationMinutes, ACCESS_TOKEN_TYPE, data);

    return { accessToken };
  };

  login = async ({ email, password }) => {
    console.log({ email, password });

    const existedUser = await this.validateUser(email);

    await this.validatePassword(password, existedUser.password);

    const tokens = this.generateAuthTokens(existedUser);

    return tokens;
  };
}

export default AuthService;
