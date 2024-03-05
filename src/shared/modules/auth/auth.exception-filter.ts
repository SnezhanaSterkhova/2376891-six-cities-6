import { inject, injectable } from 'inversify';
import { IExceptionFilter } from '../../libs/rest/index.js';
import { EComponent } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Request, Response, NextFunction } from 'express';
import { BaseUserException } from './errors/base-user.exception.js';

@injectable()
export class AuthExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(EComponent.Logger) private readonly logger: ILogger
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode)
      .json({
        type: 'AUTHORIZATION',
        error: error.message,
      });
  }
}
