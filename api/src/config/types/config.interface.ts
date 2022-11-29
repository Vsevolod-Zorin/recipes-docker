import { IAppConfig } from './app.interface';
import { IDBConfig } from './db.interface';
import { IRedisConfig } from './redis.interface';

export interface IConfig {
	app: IAppConfig;
	db: IDBConfig;
	redis: IRedisConfig;
}
