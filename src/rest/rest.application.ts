import { inject, injectable } from 'inversify';

import { Logger } from '../shared/logger/index.js';
import { Config, RestSchema } from '../shared/config/index.js';
import { Component } from '../shared/types/index.js';

import { DatabaseClient } from '../shared/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';

@injectable()
export class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $SALT: ${this.config.get('SALT')}`);
    this.logger.info(
      `Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`
    );

    await this.initDb();
  }

  private async initDb() {
    this.logger.info('Init database…');

    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    this.logger.info('Init database completed');
    return this.databaseClient.connect(mongoUri);
  }
}
