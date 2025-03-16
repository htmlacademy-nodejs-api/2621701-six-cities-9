import { Coords, Facility, HouseType, User } from './../../../types/index.js';

export class UpdateOfferDto {
  title?: string;
  description?: string;
  publishedAt?: Date;
  city?: string;
  preview?: string;
  photos?: string[];
  isPremium?: boolean;
  isFavorite?: boolean;
  rating?: number;
  type?: HouseType;
  rooms?: number;
  guests?: number;
  price?: number;
  facilities?: Facility[];
  author?: User;
  comments?: number;
  location?: Coords;
}
