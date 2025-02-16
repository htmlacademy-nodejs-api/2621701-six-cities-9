import { Facility } from './facility.type.js';
import { Coords } from './coords.type.js';
import { User } from '../User/user.type.js';
import { HouseType } from './houseType.type.js';

export type Offer = {
  title: string;
  description: string;
  publishedAt: Date;
  city: string;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isSelected: boolean;
  rating: number;
  type: HouseType;
  rooms: number;
  guests: number;
  price: number;
  facilities: Facility[];
  author: User;
  coords: Coords;
};
