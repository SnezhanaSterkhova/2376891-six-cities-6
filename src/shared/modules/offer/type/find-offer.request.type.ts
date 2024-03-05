import { Request } from 'express';
import { TRequestBody, TRequestParams } from '../../../libs/rest/index.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';

export type TFindOfferRequest = Request<TRequestParams, TRequestBody, CreateOfferDto>;
