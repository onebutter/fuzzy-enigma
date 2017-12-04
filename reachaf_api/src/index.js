import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import routes from './routes';
import config from './config';

let app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

initializeDb(db => {
  routes(app, config, db);
  app.server.listen(
    process.env.PORT || config.port,
    process.env.SERVE_IP || config.ip,
    () => {
      console.log(`Started on port ${app.server.address().port}`);
    }
  );
});

export default app;
