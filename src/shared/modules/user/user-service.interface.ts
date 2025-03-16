import { DocumentType } from '@typegoose/typegoose';

import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Offer } from '../../types/index.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findByEmailOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>>;
  getAllFavorites(userId: string): Promise<DocumentType<Offer>[]>;
  addToOrRemoveFromFavoritesById(
    userId: string,
    offerId: string,
    isAdding?: boolean
  ): Promise<DocumentType<UserEntity> | null>;
}
