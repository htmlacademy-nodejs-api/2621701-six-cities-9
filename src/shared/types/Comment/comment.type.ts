import { User } from '../User/user.type.js';

export type Comment = {
  text: string;
  rating: number;
  offerId: string;
  author: User;
};
