import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { UserService } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Component, Offer } from '../../types/index.js';
import { Logger } from '../../logger/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel)
    private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(
    email: string
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  public async findByEmailOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const user = await this.findByEmail(dto.email);

    if (user) {
      return user;
    }

    return this.create(dto, salt);
  }

  public async addToOrRemoveFromFavoritesById(
    userId: string,
    offerId: string,
    isAdding: boolean = true
  ): Promise<DocumentType<UserEntity> | null> {
    const offer = { favorites: offerId };
    return await this.userModel
      .findByIdAndUpdate(
        userId,
        { ...(isAdding ? { $addToSet: offer } : { $pull: offer }) },
        { new: true }
      )
      .exec();
  }

  public async getAllFavorites(userId: string): Promise<DocumentType<Offer>[]> {
    return await this.userModel
      .aggregate([
        { $match: { _id: userId } },
        {
          $lookup: {
            from: 'offers',
            localField: 'favorites',
            foreignField: '_id',
            as: 'favoriteOffers',
          },
        },
        {
          $addFields: {
            favoriteOffers: {
              $map: {
                input: '$favoriteOffers',
                as: 'offer',
                in: {
                  $mergeObjects: ['$$offer', { isFav: true }],
                },
              },
            },
          },
        },
        { $unwind: '$favoriteOffers' },
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$favoriteOffers._id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } },
              { $project: { _id: 1, rating: 1 } },
            ],
            as: 'comments',
          },
        },
        {
          $addFields: {
            'favoriteOffers.commentsNumber': { $size: '$comments' },
            'favoriteOffers.rating': { $avg: '$comments.rating' },
          },
        },
        { $unset: 'comments' },
        {
          $group: {
            _id: '$_id',
            favoriteOffers: { $push: '$favoriteOffers' },
          },
        },
        { $project: { favoriteOffers: 1, _id: 0 } },
      ])
      .exec();
  }
}
