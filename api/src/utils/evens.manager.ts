import { categoryService } from 'src/services/category.service';
import { postService } from 'src/services/post.service';
import { recipeService } from 'src/services/recipe.service';
import { EventEmitter } from 'events';
import cacheManager, { CacheResourceType } from './cache.manager';

interface IEventData {
	DELETE_CATEGORY: string;
}

export type EventType = keyof IEventData;

interface IEventParams<T extends EventType = EventType> {
	data: IEventData[T];
}

class EventsManager {
	private _emitter: EventEmitter;
	constructor() {
		this._emitter = new EventEmitter();
	}

	get emitter() {
		return this._emitter;
	}

	init() {
		this.on('DELETE_CATEGORY', this.deleteCategory);
		console.log('EventsManager initialized');
	}

	on(event: EventType, fn: Function) {
		this._emitter.on(event, this.errorHandler(fn));
	}

	emit(event: EventType, data: IEventParams) {
		this._emitter.emit(event, data);
	}

	errorHandler(fn: Function) {
		return async (...params) => {
			try {
				await fn(...params);
			} catch (error) {
				console.error(error);
			}
		};
	}

	private async deleteCategory(data: { data: string }) {
		const { data: categoryId } = data;

		await Promise.all([
			recipeService.deleteManyByCategoryId(categoryId),
			postService.deleteManyByCategoryId(categoryId),
			// todo: delete recipes and posts cache
		]);
		await Promise.all([
			categoryService.delete(categoryId),
			cacheManager.delAsync(`${CacheResourceType.CATEGORY}.${categoryId}`),
			cacheManager.delAsync(`${CacheResourceType.CATEGORY}`),
		]);
	}
}

const eventsManager = new EventsManager();
export default eventsManager;
