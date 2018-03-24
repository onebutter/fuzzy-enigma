export default {
  port: process.env.PORT || 4000,
  ip: process.env.SERVE_IP || '0.0.0.0',
  database: {
    database: process.env.DB_NAME || 'reachaf_db',
    password: process.env.DB_PASS || '123456',
    username: process.env.DB_USER || 'postgres'
  },
  secret: process.env.JWT_SECRET || 'Tlzmflt',
  extService: {
    discord: {
      clientID: '422652139773493248',
      clientSecret: 'szoWWDXE2Ii7RwhX4jFbKxImzRDVkZKT',
      tokenURL: 'https://discordapp.com/api/oauth2/token'
    }
  }
};
