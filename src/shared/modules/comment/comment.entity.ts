import { Comment } from '../../types/index.js';
import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity
  extends defaultClasses.TimeStamps
  implements Comment
{
  @prop({ unique: true, required: true, trim: true })
  public text: string;

  @prop({ required: true })
  public rating: number;

  @prop({
    required: true,
    ref: UserEntity,
  })
  public author: Ref<UserEntity>;

  @prop({
    required: true,
    ref: OfferEntity,
  })
  public offerId: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
