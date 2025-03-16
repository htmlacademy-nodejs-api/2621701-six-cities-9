import { Coords, Facility, HouseType } from '../../types/index.js';
import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ ref: UserEntity, required: true })
  public userId: Ref<UserEntity>;

  @prop({ required: true })
  public city: string;

  @prop({ required: true })
  public coords: Coords;

  @prop({ trim: true })
  public description: string;

  @prop({ type: () => String, enum: Facility, required: true })
  public facilities: Facility[];

  @prop({ required: true })
  public guests: number;

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public photos: string[];

  @prop({ required: true })
  public preview: string;

  @prop({ required: true })
  public price: number;

  @prop({ required: true })
  public publishedAt: Date;

  @prop({ required: true })
  public rooms: number;

  @prop({ trim: true, required: true })
  public title: string;

  @prop({ type: () => String, enum: HouseType, required: true })
  public type: HouseType;
}

export const OfferModel = getModelForClass(OfferEntity);
