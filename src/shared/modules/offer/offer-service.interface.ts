import { DocumentType } from '@typegoose/typegoose';

import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { Offer } from '../../types/index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<Offer> | null>;
  updateById(
    offerId: string,
    dto: CreateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(limit?: number): Promise<DocumentType<Offer>[]>;
  findPremiumByCity(city: string): Promise<DocumentType<Offer>[]>;
}
