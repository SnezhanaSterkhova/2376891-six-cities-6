import { inject, injectable } from 'inversify';
import { ExceptionFilter } from './exception-filter.interface.js';
import { EComponent } from '../../../types/index.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../logger/index.js';
import { ApplicationError } from '../index.js';
import { createErrorObject } from '../../../helpers/index.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register AppExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ApplicationError.ServiceError, error.message));
  }
}
