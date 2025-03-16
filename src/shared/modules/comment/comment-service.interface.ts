import { DocumentType } from '@typegoose/typegoose';

import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

export interface CommentService {
  create(
    dto: CreateCommentDto,
    salt: string
  ): Promise<DocumentType<CommentEntity>>;
  findAllByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteAllByOfferId(offerId: string): Promise<number | null>;
}
