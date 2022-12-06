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
	private _redisClient: RedisManager;
	public category: CacheResourceTemplate;
	public recipe: CacheResourceTemplate;
	public post: CacheResourceTemplate;
	// todo: _RedisClient should

	constructor() {
		// todo: ttl?
		this._redisClient = new RedisManager();
		this.category = new CacheResourceTemplate(this._redisClient, CacheResourceType.CATEGORY);
		this.recipe = new CacheResourceTemplate(this._redisClient, CacheResourceType.RECIPE);
		this.post = new CacheResourceTemplate(this._redisClient, CacheResourceType.POST);

		this.init = this.init.bind(this);
		// this.flushAll = this.flushAll.bind(this);
	}

	// todo:
	public async init() {
		await this._redisClient.init();
	}

	// todo: refactor
	public async flushAll() {
		await this._redisClient._redisClient.flushAll();
	}
}

const cacheManager = new CacheManager();
export default cacheManager;
