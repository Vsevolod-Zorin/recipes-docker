import { IConfig } from './types/config.interface';

export const config: IConfig = {
	app: {
		httpPort: Number(process.env.PORT) || 80,
		httpsPort: 443,
	},
	db: {
		mongoUrl: process.env.MONGO_URL as string,
	},
};
