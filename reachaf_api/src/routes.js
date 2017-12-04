// import express from 'express';
// import AuthService from './services/Auth';
// import UserService from './services/User';
// import NamecardService from './services/Namecard';

const routes = (app, config, db) => {
  // const Router = express.Router();
  app.use('/auth', () => {console.log('-=-=-=auth')});
  app.use('/user', () => {console.log('--=-=-user')});
};

export default routes;
