import { userType } from './userType.type.js';

export type User = {
    name: string;
    email: string;
    avatar: string;
    password: string;
    userStatus: userType;
};
