/* eslint-disable */
import babelcore from 'babel-core/register';
import babelpolyfill from 'babel-polyfill';
/* eslint-enable */
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from 'config';
import routes from './routes';
import devUtils from './utils/devUtils';
import initDB from './db';

let app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));
app.set('jwt-secret', config.secret);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (app.get('env') === 'development') {
  console.log('activating devUtils');
  app.use('/utils', devUtils);
}

if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    if (req.headers['origin'] !== config.origin) {
      res.json({ error: 'invalid origin' });
    }
    next();
  });
}

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

initDB(async () => {
  app.server.listen(config.port, config.ip, () => {
    console.log(`Current env: ${app.get('env')} ${process.env.NODE_ENV}`);
    console.log(`config: port ${config.port} address ${config.ip}`);
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;
