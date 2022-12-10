import CacheResourceTemplate from './cache-resource-template.manager';
import RedisManager from './redis.manager';

interface ICacheManager {
	init: () => void;
}
// todo: short db key. category = cat?
export enum CacheResourceType {
	CATEGORY = 'category',
	RECIPE = 'recipe',
	POST = 'post',
}

export class CacheManager implements ICacheManager {
	private _redisManager: RedisManager;
	public category: CacheResourceTemplate;
	public recipe: CacheResourceTemplate;
	public post: CacheResourceTemplate;
	// todo: _RedisClient should

	constructor() {
		// todo: ttl?
		this._redisManager = new RedisManager();
		this.category = new CacheResourceTemplate(this._redisManager, CacheResourceType.CATEGORY);
		this.recipe = new CacheResourceTemplate(this._redisManager, CacheResourceType.RECIPE);
		this.post = new CacheResourceTemplate(this._redisManager, CacheResourceType.POST);

		this.init = this.init.bind(this);
	}

	public async init() {
		await this._redisManager.init();
	}

	public flushAll() {
		this._redisManager.flushAll();
	}

	public async flushAllAsync(): Promise<void> {
		await this._redisManager.flushAllAsync();
	}

	public async flushAllWithFetcher<T>(fetcher: () => Promise<T>): Promise<T> {
		return Promise.all([this.flushAllAsync(), fetcher()])[1];
	}
}

const cacheManager = new CacheManager();
export default cacheManager;
