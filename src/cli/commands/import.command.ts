import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/file-reader/index.js';
import { getMongoURI } from '../../shared/helpers/index.js';
import { Offer } from '../../shared/types/index.js';
import {
  DefaultOfferService,
  OfferModel,
  OfferService,
} from '../../shared/modules/offer/index.js';
import {
  DefaultUserService,
  UserModel,
  UserService,
} from '../../shared/modules/user/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/database-client/index.js';
import { Logger } from '../../shared/logger/index.js';
import { ConsoleLogger } from '../../shared/logger/console.logger.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';

export class ImportCommand implements Command {
  public readonly name: string = '--import';
  private readonly logger: Logger = new ConsoleLogger();
  private readonly userService: UserService = new DefaultUserService(
    this.logger,
    UserModel
  );

  private readonly offerService: OfferService = new DefaultOfferService(
    this.logger,
    OfferModel
  );

  private readonly databaseClient: DatabaseClient = new MongoDatabaseClient(
    this.logger
  );

  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      this.logger.error(
        `Can't import data from file: ${filename}`,
        err as Error
      );
    }
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findByEmailOrCreate(
      Object.assign({}, offer.author, { password: DEFAULT_USER_PASSWORD }),
      this.salt
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      publishedAt: offer.publishedAt,
      city: offer.city,
      preview: offer.preview,
      photos: offer.photos,
      isPremium: offer.isPremium,
      rating: offer.rating,
      type: offer.type,
      rooms: offer.rooms,
      guests: offer.guests,
      price: offer.price,
      facilities: offer.facilities,
      author: user.id,
      coords: offer.coords,
    });
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    this.logger.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }
}
