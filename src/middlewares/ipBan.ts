import { NextFunction, Request, Response } from 'express';

import { logger } from '../configs/winston';
import Ban from '../models/Ban';

const ipBan = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.socket.remoteAddress;

  const ban = await Ban.findOne({ ip });
  if (ban) {
    logger.info(`Access to banned user ip: ${ip}`);
    res.send('🐶🐶🐶너무 많믄 접속믈 시도했거나 막믜적민 곰격믈 감지하며 서버메서 해담 IP를 차단했습니다.🐶🐶🐶');
    return;
  }

  next();
};

export default ipBan;
