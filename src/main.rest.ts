import 'reflect-metadata';
import { Container } from 'inversify';
import { Logger, PinoLogger } from './shared/logger/index.js';
import { Application } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { Config, RestConfig, RestSchema } from './shared/config/index.js';

async function bootstrap() {
  const container = new Container();
  container
    .bind<Application>(Component.Application)
    .to(Application)
    .inSingletonScope();

  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();

  container
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();

  const application = container.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
