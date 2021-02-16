import 'dotenv-safe/config';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import https from 'https';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { logger, stream } from './configs/winston';
import ipBan from './middlewares/ipBan';
import routes from './routes';

const isDev = process.env.NODE_ENV === 'development';

const app = express();

app.set('json spaces', 2);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(isDev ? 'dev' : 'combined', isDev ? undefined : { stream }));
app.use(ipBan);

app.use('/api', routes);

mongoose.connect(
  process.env.DB_URI!,
  {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      throw err;
    }

    logger.info('db connected');
  },
);

if (isDev) {
  http.createServer(app).listen(process.env.PORT, async () => {
    logger.info(`Development server is running http://localhost:${process.env.PORT}`);
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(301, {
        Location: `https://${req.headers.host}${req.url}`,
      });
      res.end();
    })
    .listen(80);
  https.createServer(app).listen(443, () => {
    logger.info('Production server is running at port 443');
  });
}
