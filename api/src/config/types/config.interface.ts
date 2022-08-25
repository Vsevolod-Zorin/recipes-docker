import { IAppConfig } from './app.interface';
import { IDBConfig } from './db.interface';

export interface IConfig {
  app: IAppConfig;
  db: IDBConfig;
}
