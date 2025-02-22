import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  Coords,
  Facility,
  HouseType,
  Offer,
  User,
  UserType,
} from '../types/index.js';
import { SEPARATOR } from '../constants/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      publishedAt,
      city,
      preview,
      photos,
      isPremium,
      rating,
      type,
      rooms,
      guests,
      price,
      facilities,
      author,
      coords,
    ] = line.split('\t');

    return {
      title,
      description,
      publishedAt: new Date(publishedAt),
      city,
      preview,
      photos: this.parsePhotos(photos),
      isPremium: this.parseIsPremium(isPremium),
      rating: Number.parseInt(rating, 10),
      type: type as HouseType,
      rooms: Number.parseInt(rooms, 10),
      guests: Number.parseInt(guests, 10),
      price: this.parsePrice(price),
      facilities: this.parseFacilities(facilities),
      author: this.parseAuthor(author),
      coords: this.parseCoords(coords),
    };
  }

  private parsePhotos(photosString: string): string[] {
    return photosString
      .split(SEPARATOR)
      .map((photo) => photo.trim() as Facility);
  }

  private parseIsPremium(isPremiumString: string): boolean {
    return isPremiumString.toLowerCase() === 'Да'.toLowerCase();
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseFacilities(facilitiesString: string): Facility[] {
    return facilitiesString
      .split(SEPARATOR)
      .map((facility) => facility.trim() as Facility);
  }

  private parseAuthor(authorString: string): User {
    const [name, email, avatar, userStatus] = authorString
      .split(SEPARATOR)
      .map((data) => data.trim());
    return {
      name,
      email,
      avatar,
      userStatus: userStatus as UserType,
    };
  }

  private parseCoords(coordsString: string): Coords {
    const [latitude, longitude] = coordsString
      .split(SEPARATOR)
      .map((coordinate) => Number.parseFloat(coordinate));
    return { latitude, longitude };
  }
}
