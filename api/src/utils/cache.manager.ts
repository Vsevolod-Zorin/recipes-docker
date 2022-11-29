import * as Redis from 'redis';
import { config } from 'src/config';
import { ICategory } from 'src/types/category/category.interface';
import { IPost } from 'src/types/post/post.interface';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import { promisify } from 'util';

interface ICacheManager {
	init: () => void;
}
export enum CacheResourceType {
	CATEGORY = 'category',
	RECIPE = 'recipe',
	POST = 'post',
}

type CreateCacheType = ICategory | ICategory[] | IRecipe | IRecipe[] | IPost | IPost[];

class CacheManager implements ICacheManager {
	// todo check correct ttl value
	private _redisClient;
	public getAsync;
	public setAsync;
	public delAsync;

	constructor() {
		this.init = this.init.bind(this);
	}

	public async init() {
		await new Promise(resolve => {
			this._redisClient = Redis.createClient({
				// todo: database name / factory?
				legacyMode: true,
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
			resolve(this._redisClient);
		});

		this.getAsync = promisify(this._redisClient.get).bind(this._redisClient);
		this.setAsync = promisify(this._redisClient.set).bind(this._redisClient);
		this.delAsync = promisify(this._redisClient.del).bind(this._redisClient);

		await this._redisClient.connect();
		await this._redisClient.ping();
	}

	public async createAsync(key: string, value: CreateCacheType) {
		await this.setAsync(key, JSON.stringify(value));
	}

	/**
	 * @description generic function, takes `fetcher` argument which is meant to refresh the cache
	 * */
	public async getOrFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
		// todo: check connected method
		// if we're not connected to redis, by pass cache
		// if (!this.redisClient.connected) {
		// 	return await fetcher();
		// }

		return new Promise(async (resolve, reject) => {
			await this._redisClient.get(key, async (err, cachedData) => {
				// todo redis-errrors
				if (err) {
					return reject(err);
				}
				if (cachedData) {
					// if value is found in cache, return it
					return resolve(JSON.parse(cachedData));
				}

				// if value is not in cache, fetch it and return it
				const fetchedData = await fetcher();

				// this.redisManager.set(key, JSON.stringify(result), 'EX', this.ttl, (err, reply) => {
				await this._redisClient.set(key, JSON.stringify(fetchedData), (err, reply) => {
					// todo: redis-errors
					if (err) {
						return reject(err);
					}
				});
				return resolve(fetchedData);
			});
		});
	}

	flush() {
		this._redisClient.flushall();
	}
}

const cacheManager = new CacheManager();
export default cacheManager;
