import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../logger/index.js';
import { DEFAULT_COMMENT_COUNT } from '../../constants/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(
    dto: CreateCommentDto
  ): Promise<DocumentType<CommentEntity>> {
    const comment = new CommentEntity(dto);

    const result = await this.commentModel.create(comment);
    this.logger.info(`New comment created: ${comment.text}`);

    return result.populate('author');
  }

  public async findAllByOfferId(
    offerId: string
  ): Promise<types.DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offer: offerId })
      .sort({ createdAt: SortType.Down })
      .limit(DEFAULT_COMMENT_COUNT)
      .populate('author');
  }

  public async deleteAllByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel
      .deleteMany({ offer: offerId })
      .exec();

    return result.deletedCount;
  }
}
