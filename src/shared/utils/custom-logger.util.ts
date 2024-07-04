import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as crypto from 'crypto';

@Injectable()
export class CustomLogger implements LoggerService {
  private readonly logger: LoggerService;


  constructor() {
    this.logger = WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            nestWinstonModuleUtilities.format.nestLike()
          )
        })
      ]
    });
  }

  log(message: string, context?: string) {
    this.logger.log(this.sanitizeLog(message), { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(this.sanitizeLog(message), { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(this.sanitizeLog(message), { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(this.sanitizeLog(message), { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(this.sanitizeLog(message), { context });
  }

  private sanitizeLog(message: string): string {
    // Hash or mask passwords in the log message
    return message
    .replace(/"password":"(.*?)"/g, (_, p) => `"password":"${this.hashPassword(p)}"`)
    .replaceAll("\\", "")
    .replace(/"access_token":"(.*?)"/g, `"access_token":"[SANITIZED]"`);
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}
