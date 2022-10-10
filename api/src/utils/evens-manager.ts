import { categoryService } from 'src/services/category.service';
import { postService } from 'src/services/post.service';
import { recipeService } from 'src/services/recipe.service';
import { EventEmitter } from 'events';

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

	private async deleteCategory(categoryId: string) {
		await Promise.all([
			recipeService.deleteManyByCategoryId(categoryId),
			postService.deleteManyByCategoryId(categoryId),
		]);
		await categoryService.delete(categoryId);
	}

	on(event: EventType, fn: Function) {
		this._emitter.on(event, this.errorHandler(fn));
	}

	// todo: data type
	emit(event: EventType, data: IEventParams) {
		this._emitter.emit(event, data);
	}
}

const eventsManager = new EventsManager();
eventsManager.init();
export default eventsManager;
