import { User } from '../User/user.type.js';

export type Comment = {
    text: string;
    publishedAt: string;
    rating: number;
    author: User;
};
