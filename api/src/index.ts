import { config } from './config';
import appManager from './utils/app.manager';
import cacheManager from './utils/cache.manager';
import eventsManager from './utils/evens.manager';

const startServer = () => {
	appManager.app.listen(config.app.httpPort, () => {
		console.log(`Started api service on port ${config.app.httpPort}`);
	});
};

const run = async () => {
	const connection = await appManager.connectToDb();
	connection
		.on('connected', () => console.log('Connected to database on host', connection.host))
		.on('error', console.log)
		.on('disconnected', async () => await appManager.connectToDb());

	await cacheManager.init();
	eventsManager.init();

	startServer();
};

run();
