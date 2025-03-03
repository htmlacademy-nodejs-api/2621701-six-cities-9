import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  Coords,
  Facility,
  HouseType,
  Offer,
  User,
  UserType,
} from '../types/index.js';
import { SEPARATOR, TAB_SEPARATOR } from '../constants/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();
      nextLinePosition = remainingData.indexOf('\n');

      while (nextLinePosition) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
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
    ] = line.split(TAB_SEPARATOR);

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
