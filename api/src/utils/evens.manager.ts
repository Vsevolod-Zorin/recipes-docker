import { categoryService } from 'src/services/category.service';
import { postService } from 'src/services/post.service';
import { recipeService } from 'src/services/recipe.service';
import { EventEmitter } from 'events';
import cacheManager, { CacheResourceType } from './cache.manager';
import { ICategory } from 'src/types/category/category.interface';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import { IPost } from 'src/types/post/post.interface';

// todo: recipe_list
interface IEventData {
	SET_CATEGORY: ICategory;
	DELETE_CATEGORY: ICategory;

	SET_RECIPE: IRecipe;
	DELETE_RECIPE: IRecipe;

	SET_POST: IPost;
	DELETE_POST: IPost;
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
		this.on('SET_CATEGORY', this.setCategory);
		this.on('DELETE_CATEGORY', this.deleteCategory);
		this.on('SET_RECIPE', this.setRecipe);
		this.on('DELETE_RECIPE', this.deleteRecipe);
		this.on('SET_POST', this.setPost);
		this.on('DELETE_POST', this.deletePost);
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

	/**
	 *@description set new cache "category.id" and del cache "category"(all)
	 */
	private async setCategory(data: { data: ICategory }) {
		const { data: createdCategory } = data;

		await Promise.all([
			cacheManager.createAsync(
				cacheManager.generateKey(CacheResourceType.CATEGORY, createdCategory._id),
				createdCategory
			),
			cacheManager.delAsync(`${CacheResourceType.CATEGORY}`),
		]);
	}

	/**
	 *@description del cache "category.id" and del cache "category"(all)
	 */
	private async deleteCategory(data: { data: string }) {
		const { data: categoryId } = data;

		await Promise.all([
			recipeService.deleteManyByCategoryId(categoryId),
			postService.deleteManyByCategoryId(categoryId),
			// todo: delete recipes and posts cache
		]);
		await Promise.all([
			categoryService.delete(categoryId),
			cacheManager.delAsync(cacheManager.generateKey(CacheResourceType.CATEGORY, categoryId)),
			cacheManager.delAsync(cacheManager.generateKey(CacheResourceType.CATEGORY)),
		]);
	}

	/**
	 *@description set new cache "categoryId.recipe.id" and del cache "categoryId.recipe"(all)
	 */
	private async setRecipe(data: { data: IRecipe }) {
		const { data: recipe } = data;

		await Promise.all([
			cacheManager.createAsync(
				cacheManager.setAsync(
					cacheManager.generateKey(CacheResourceType.RECIPE, recipe._id.toString())
				),
				// `${recipe.categoryId}.${CacheResourceType.RECIPE}.${recipe._id}`,
				recipe
			),
			// cacheManager.delAsync(`${recipe.categoryId}.${CacheResourceType.RECIPE}`),
			cacheManager.delAsync(
				cacheManager.generateKey(
					CacheResourceType.CATEGORY,
					recipe.categoryId.toString(),
					CacheResourceType.RECIPE
				)
			),
		]);
	}

	/**
	 *@description set new cache "categoryId.recipe.id" and del cache "categoryId.recipe"(all)
	 */
	private async deleteRecipe(data: { data: IRecipe }) {
		const { data: recipe } = data;

		await Promise.all([
			recipeService.delete(recipe._id),
			cacheManager.delAsync(cacheManager.generateKey(CacheResourceType.RECIPE, recipe._id)),
			cacheManager.delAsync(
				cacheManager.generateKey(
					CacheResourceType.CATEGORY,
					recipe.categoryId.toString(),
					CacheResourceType.RECIPE
				)
			),
			// 	cacheManager.delAsync(`${recipe.categoryId}.${CacheResourceType.RECIPE}.${recipe._id}`),
			// 	cacheManager.delAsync(`${recipe.categoryId}.${CacheResourceType.RECIPE}`),
		]);
	}

	/**
	 *@description set new cache "categoryId.post.id" and del cache "categoryId.post"(all)
	 */
	private async setPost(data: { data: IPost }) {
		const { data: post } = data;

		await Promise.all([
			cacheManager.createAsync(cacheManager.generateKey(CacheResourceType.POST, post._id), post),
			cacheManager.delAsync(
				cacheManager.generateKey(
					CacheResourceType.CATEGORY,
					post.categoryId.toString(),
					CacheResourceType.POST
				)
			),
			// cacheManager.createAsync(`${post.categoryId}.${CacheResourceType.POST}.${post._id}`, post),
			// cacheManager.delAsync(`${post.categoryId}.${CacheResourceType.POST}`),
		]);
	}

	/**
	 *@description set new cache "categoryId.post.id" and del cache "categoryId.post"(all)
	 */
	private async deletePost(data: { data: IPost }) {
		const { data: post } = data;

		await Promise.all([
			categoryService.delete(post._id),
			cacheManager.delAsync(cacheManager.generateKey(CacheResourceType.POST, post._id)),
			cacheManager.delAsync(
				cacheManager.generateKey(
					CacheResourceType.CATEGORY,
					post.categoryId.toString(),
					CacheResourceType.POST
				)
			),
			// cacheManager.delAsync(`${post.categoryId}.${CacheResourceType.POST}.${post._id}`),
			// cacheManager.delAsync(`${post.categoryId}.${CacheResourceType.POST}`),
		]);
	}
}

const eventsManager = new EventsManager();
export default eventsManager;
