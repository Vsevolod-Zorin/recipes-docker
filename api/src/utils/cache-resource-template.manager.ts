import { CacheResourceType } from './cache.manager';
import RedisManager from './redis.manager';

interface ICacheQuery {
	[key: string]: string;
}

class CacheResourceTemplate {
	private _redisClient: RedisManager;
	public readonly name: string;
	public readonly resourceType: CacheResourceType;

	constructor(redisClient: RedisManager, resourceType: CacheResourceType) {
		this.name = resourceType;
		this.resourceType = resourceType;
		this._redisClient = redisClient;
	}

	async find<T>(query: unknown, fetcher: () => Promise<T>) {
		return this._redisClient.getOrFetch<T>(this.findKey(query), fetcher);
	}
	private findKey(query: unknown): string {
		return this.generateKey(true, this.resourceType, query);
	}
	async findOne<T>(query: unknown, fetcher: () => Promise<T>): Promise<T> {
		return this._redisClient.getOrFetch<T>(this.findOneKey(query), fetcher);
	}
	private findOneKey(query: unknown): string {
		return this.generateKey(true, this.resourceType, JSON.stringify(query));
	}

	// todo: test
	public generateKey(
		isArray: boolean = false,
		resourceType: CacheResourceType | null = null,
		query: unknown = {}
	): string {
		let key: string = '';

		if (isArray) {
			key += 'arr.';
		} else {
			key += 'single.';
		}

		if (resourceType) {
			key += resourceType;
		}

		key += JSON.stringify({ ...(query as ICacheQuery) });

		return key;
	}
}

export default CacheResourceTemplate;
