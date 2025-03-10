import { Coords, Facility, HouseType, User } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public publishedAt: Date;
  public city: string;
  public preview: string;
  public photos: string[];
  public isPremium: boolean;
  public rating: number;
  public type: HouseType;
  public rooms: number;
  public guests: number;
  public price: number;
  public facilities: Facility[];
  public author: User;
  public coords: Coords;
}
