import winston, { format, transports } from 'winston';
import { inspect } from 'util';

const { combine, prettyPrint, json, timestamp } = format;

const Logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint(), json()),
  transports: [
    new transports.Console({
      format: winston.format.simple(),
      timestamp: true,
      prettyPrint: inspect
    })
  ]
});

export default Logger;
