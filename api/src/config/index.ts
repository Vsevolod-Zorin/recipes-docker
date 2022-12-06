import { IConfig } from './types/config.interface';

export const config: IConfig = {
	app: {
		httpPort: Number(process.env.PORT) || 80,
		httpsPort: 443,
	},
	db: {
		mongoUrl: (process.env.MONGO_URL as string) || 'mongodb://127.0.0.1:27017',
	},
	redis: {
		port: 6379,
		host: 'redis://redis',
		// todo: ex, px
		ttl: 10000, // 10s
	},
};
