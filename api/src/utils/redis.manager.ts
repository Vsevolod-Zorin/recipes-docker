import * as Redis from 'redis';
import { config } from 'src/config';

class RedisManager {
	public _redisClient;

	constructor() {
		this._redisClient = Redis.createClient({
			url: `${config.redis.host}:${config.redis.port}`,
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
	}

	public async init() {
		await this._redisClient.connect();
	}

	/**
	 * @description parce inside.
	 */
	async getAsync<T>(key: string): Promise<T> {
		const fetchedData = await Promise.resolve(this._redisClient.get(key));
		// todo: parce here or outside this function?
		if (fetchedData) {
			return JSON.parse(fetchedData);
		}
		return null;
	}

	/**
	 * @description stringify inside.
	 */
	async setAsync(key: string, value: unknown) {
		return Promise.resolve(this._redisClient.set(key, JSON.stringify(value)));
	}

	async flushAll(): Promise<void> {
		return this._redisClient.flushAll();
	}

	// todo: await or new thread?
	async flushAllAsync(): Promise<void> {
		return Promise.resolve(this._redisClient.flushAll());
	}

	/**
	 * @description generic function, takes `fetcher` argument which is meant to refresh the cache
	 * */
	public async getOrFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
		const cachedData = await this.getAsync<T>(key);

		if (cachedData) {
			return cachedData;
		}

		const fetchedData = await fetcher();
		await this.setAsync(key, fetchedData);

		return fetchedData;
	}
}
export default RedisManager;
