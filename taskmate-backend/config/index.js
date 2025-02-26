export default {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    corsOptions: {
      origin: '*',
      optionsSuccessStatus: 200,
    },
  };
  