import * as Redis from 'redis';
import { config } from 'src/config';
import { ICategory } from 'src/types/category/category.interface';
import { IPost } from 'src/types/post/post.interface';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import { promisify } from 'util';

interface ICacheManager {
	init: () => void;
}
// todo: short db key. category = cat?
export enum CacheResourceType {
	CATEGORY = 'category',
	RECIPE = 'recipe',
	POST = 'post',
}

type CreateCacheValueType = ICategory | ICategory[] | IRecipe | IRecipe[] | IPost | IPost[];

export class CacheManager implements ICacheManager {
	// todo check correct ttl value
	private _redisClient;
	private readonly _ttl: number;
	public getAsync;
	public setAsync;
	public delAsync;

	constructor(ttl: number = 100) {
		this._ttl = ttl;
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

	public async createAsync(key: string, value: CreateCacheValueType) {
		this.setAsync(key, JSON.stringify(value));
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
					return resolve(JSON.parse(cachedData) as T);
				}

				// if value is not in cache, fetch it and return it
				const fetchedData = await fetcher();

				// this.redisManager.set(key, JSON.stringify(result), 'EX', this.ttl, (err, reply) => {
				// todo : await ?
				this._redisClient.set(key, JSON.stringify(fetchedData), (err, reply) => {
					// todo: redis-errors
					if (err) {
						return reject(err);
					}
				});
				return resolve(fetchedData);
			});
		});
	}

	flushAll() {
		this._redisClient.flushAll();
	}
	// todo: add expire

	// todo: test
	// todo create new keygen
	/**
	 * @description generate string as breadcrumbs.
	 * @default ! generateKey(null, null,null) => 'category'
	 * @return "sourceType" = sourceType[]
	 * @return "sourceType.id" = sourceType
	 * @return "sourceType.id.resourceType" = resourceType[]
	 * @return "sourceType.id.resourceType.id" = resourceType
	 */
	public generateKey(
		sourceType: CacheResourceType | null = null,
		sourceId: string | null = null,
		resourceType: CacheResourceType | null = null,
		resourceId: string | null = null
	): string {
		// category = []
		// category.id = category
		// category.id.recipe = []
		// category.id.recipe.id = post
		// category.id.post = []
		// category.id.post.id = post

		// category
		let key: string = '';
		if (sourceType) {
			key += sourceType;
		}

		if (sourceId) {
			key += `.${sourceId}`;
		}
		if (resourceType) {
			key += `.${resourceType}`;
		}
		if (resourceId) {
			key += `.${resourceId}`;
		}
		console.log('---key', key);

		return key;
	}
}

const cacheManager = new CacheManager(5);
export default cacheManager;
