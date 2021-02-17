import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

const logDir = 'logs';
const { combine, timestamp, printf } = winston.format;

const logFormat = printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);
const isDev = process.env.NODE_ENV !== 'production';

export const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new WinstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: '%DATE%.log',
      maxFiles: 60,
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: '%DATE%.error.log',
      maxFiles: 60,
      zippedArchive: true,
    }),
  ],
});

if (isDev) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
}

export const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};
