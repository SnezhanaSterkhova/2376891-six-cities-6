import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
import { CreateCommentDto } from '../dto/create-comment.dto.js';

export type TCreateCommentRequest = Request<RequestParams, RequestBody, CreateCommentDto>;