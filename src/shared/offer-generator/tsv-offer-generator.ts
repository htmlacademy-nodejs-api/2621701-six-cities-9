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
} from '../constants/index.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publishedAt = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.previews);
    const photos = getRandomItem<string>(this.mockData.photos);
    const isPremium = getRandomItem<string>(this.mockData.isPremium);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem<string>(this.mockData.types);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const facilities = getRandomItems<string>(this.mockData.facilities);
    const author = getRandomItem<string>(this.mockData.authors);
    const coords = getRandomItem<string>(this.mockData.coords);

    // const photo = getRandomItem<string>(this.mockData.offerImages);
    // const type = getRandomItem([Offer.Buy, Offer.Sell]);
    // const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    // const author = getRandomItem(this.mockData.users);
    // const email = getRandomItem(this.mockData.emails);
    // const avatar = getRandomItem(this.mockData.avatars);

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
    ].join('\t');
  }
}
