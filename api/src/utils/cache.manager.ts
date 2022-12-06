
import CacheResourceTemplate from './cache-resource-template.manager';

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
	public category: CacheResourceTemplate;
	public recipe: CacheResourceTemplate;
	public post: CacheResourceTemplate;

	// todo: _RedisClient should

	constructor() {
		// todo: ttl?
		this.category = new CacheResourceTemplate(CacheResourceType.CATEGORY);
		this.recipe = new CacheResourceTemplate(CacheResourceType.RECIPE);
		this.post = new CacheResourceTemplate(CacheResourceType.POST);

		this.init = this.init.bind(this);
	}

	// todo:
	public async init() {
		await this.category.init();
		await this.recipe.init();
		await this.post.init();
	}

	// todo: refactor
	public async flushAll() {}
}

const cacheManager = new CacheManager();
export default cacheManager;
