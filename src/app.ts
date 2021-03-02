import 'dotenv-safe/config';

import cors from '@koa/cors';
import Router from '@koa/router';
// import fs from 'fs';
import http from 'http';
import https from 'https';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import forceHTTPS from 'koa-force-https';
import helmet from 'koa-helmet';
import morgan from 'koa-morgan';
import koaStatic from 'koa-static';
import mongoose from 'mongoose';
import path from 'path';

import api from './api';
import { logger, stream } from './configs/winston';

const isDev = process.env.NODE_ENV !== 'production';

// const options = {
//   key: fs.readFileSync(path.join('keys', 'private.pem')),
//   cert: fs.readFileSync(path.join('keys', 'public.pem')),
// };

const app = new Koa();
const router = new Router();

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

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(morgan(isDev ? 'dev' : 'combined', { stream }));
if (!isDev) {
  app.use(forceHTTPS());
}
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, 'static')));

router.use('/api', api.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  logger.error(`error: ${err} context: ${ctx}`);
});

// if (isDev) {
//   http.createServer(app.callback()).listen(process.env.PORT, () => {
//     logger.info(`Development http server is running http://localhost:${process.env.PORT}`);
//   });
//   https
//     .createServer(/* options, */ app.callback())
//     .listen(Number.parseInt(process.env.PORT!, 10) + 1, () => {
//       logger.info(
//         `Development https server is running https://localhost:${
//           Number.parseInt(process.env.PORT!, 10) + 1
//         }`,
//       );
//     });
// } else {
// http.createServer(app.callback()).listen(process.env.PORT);
https.createServer(/* options, */ app.callback()).listen(process.env.PORT, () => {
  logger.info('Production server is running at port 443');
});
// }
