import { UserType } from './userType.type.js';

export type User = {
  name: string;
  email: string;
  avatar: string;
  userStatus: UserType;
};
