import { Coords, Facility, HouseType, Offer, User } from '../../types/index.js';
import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
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
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({ ref: UserEntity, required: true })
  public author: User;

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

  @prop({ required: true, min: 1, max: 5 })
  public rating: number;

  @prop({ required: true })
  public rooms: number;

  @prop({ trim: true, required: true })
  public title: string;

  @prop({ type: () => String, enum: HouseType, required: true })
  public type: HouseType;

  constructor(offerData: Offer) {
    super();

    this.author = offerData.author;
    this.city = offerData.city;
    this.coords = offerData.coords;
    this.description = offerData.description;
    this.facilities = offerData.facilities;
    this.guests = offerData.guests;
    this.isPremium = offerData.isPremium;
    this.photos = offerData.photos;
    this.preview = offerData.preview;
    this.price = offerData.price;
    this.publishedAt = offerData.publishedAt;
    this.rating = offerData.rating;
    this.rooms = offerData.rooms;
    this.title = offerData.title;
    this.type = offerData.type;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
