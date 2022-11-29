import * as Redis from 'redis';
import { config } from 'src/config';
import { promisify } from 'util';

class RedisManager {
	private redisClient;
	public get;
	public set;
	public hset;
	public hget;
	public hdel;
	public del;
	public flushall;
	public connected;

	public async init() {
		await new Promise(resolve => {
			this.redisClient = Redis.createClient({
				// todo: database name
				// todo: collection name
				legacyMode: true,
				url: `${config.redis.host}:${6379}`,
			});

			this.redisClient.on('connect', () => {
				console.log('Connected to Redis');
			});
			this.redisClient.on('ready', () => {
				console.log('Redis is ready');
			});
			this.redisClient.on('error', err => {
				console.log('Error occured while connecting or accessing redis server', { err });
			});
			resolve(this.redisClient);
		});
		// //@ts-ignore
		this.get = promisify(this.redisClient.get).bind(this.redisClient);
		this.set = promisify(this.redisClient.set).bind(this.redisClient);
		this.hset = promisify(this.redisClient.hset).bind(this.redisClient);
		this.hget = promisify(this.redisClient.hget).bind(this.redisClient);
		this.hdel = promisify(this.redisClient.hdel).bind(this.redisClient);
		this.del = promisify(this.redisClient.del).bind(this.redisClient);
		this.flushall = promisify(this.redisClient.flushall).bind(this.redisClient);
		// todo: check
		// this.connected = promisify(this.redisClient.connected).bin11d(this.redisClient);

		await this.redisClient.connect();
		await this.redisClient.ping();
	}
}
// export const redisManager = new RedisManager(collectionName);
export default RedisManager;
