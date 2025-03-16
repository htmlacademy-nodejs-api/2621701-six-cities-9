import { User } from '../../../types/index.js';

export class CreateCommentDto {
  public text: string;
  public rating: number;
  public offerId: string;
  public author: User;
}
