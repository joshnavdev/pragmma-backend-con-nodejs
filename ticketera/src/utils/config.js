const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};

export default config;
