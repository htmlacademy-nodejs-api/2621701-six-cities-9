import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../helpers/index.js';
import {
  FIRST_WEEK_DAY,
  LAST_WEEK_DAY,
  MAX_GUESTS,
  MAX_PRICE,
  MAX_RATING,
  MAX_ROOMS,
  MIN_GUESTS,
  MIN_PRICE,
  MIN_RATING,
  MIN_ROOMS,
  TAB_SEPARATOR,
} from '../constants/index.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publishedAt = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const preview = getRandomItem(this.mockData.previews);
    const photos = getRandomItem(this.mockData.photos);
    const isPremium = getRandomItem(this.mockData.isPremium);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem(this.mockData.types);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const facilities = getRandomItems(this.mockData.facilities);
    const author = getRandomItem(this.mockData.authors);
    const coords = getRandomItem(this.mockData.coords);

    return [
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
    ].join(TAB_SEPARATOR);
  }
}
