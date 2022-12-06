import * as Redis from 'redis';
import * as Util from 'util';
import { config } from 'src/config';

class RedisManager {
	public _redisClient;
	public getAsync;
	public setAsync;
	public delAsync;
	public flushAllAsync;

	constructor() {
		this._redisClient = Redis.createClient({
			url: `${config.redis.host}:${6379}`,
		});

		this._redisClient.on('connect', () => {
			console.log('Connected to Redis');
		});
		this._redisClient.on('ready', () => {
			console.log('Redis is ready');
		});
		this._redisClient.on('error', err => {
			console.log('Error occured while connecting or accessing redis server', { err });
		});

		this.init = this.init.bind(this);
		this.getAsync = Util.promisify(this._redisClient.get).bind(this._redisClient);
		this.setAsync = Util.promisify(this._redisClient.set).bind(this._redisClient);
		this.delAsync = Util.promisify(this._redisClient.del).bind(this._redisClient);
		this.flushAllAsync = Util.promisify(this._redisClient.flushAll).bind(this._redisClient);
	}

	public async init() {
		await this._redisClient.connect();
	}

	/**
	 * @description generic function, takes `fetcher` argument which is meant to refresh the cache
	 * */
	public async getOrFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
		const cachedData = await this._redisClient.get(key);
		if (cachedData) {
			// console.log('--- cachedData', { cachedData });
			return JSON.parse(cachedData);
		}
		const fetchedData = await fetcher();
		// console.log('-- fetched data', { fetchedData });
		await this._redisClient.set(key, JSON.stringify(fetchedData));
		return fetchedData;
	}
}
// export const redisManager = new RedisManager(collectionName);
export default RedisManager;
