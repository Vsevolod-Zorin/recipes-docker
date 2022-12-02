import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { recipeService } from 'src/services/recipe.service';
import { validateCategoryById } from 'src/shared/validation/category/category-get-by-id.validarion';
import { ExpressRecipeRequest } from 'src/types/express/expressRecipeRequest.interface';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import cacheManager, { CacheResourceType } from 'src/utils/cache.manager';
import eventsManager from 'src/utils/evens.manager';

class RecipeController {
	async findAll(req: Request, res: Response) {
		const recipes = await cacheManager.getOrFetch<IRecipe[]>(
			cacheManager.generateKey(CacheResourceType.RECIPE),
			() => recipeService.find()
		);

		res.status(StatusCodes.OK).json(recipes);
	}

	async getById(req: ExpressRecipeRequest, res: Response) {
		const { recipe } = req;
		res.status(StatusCodes.OK).json(recipe);
	}

	async getByCategoryId(req: ExpressRecipeRequest, res: Response) {
		const { id } = req.params;

		const recipes = await cacheManager.getOrFetch<IRecipe[]>(
			cacheManager.generateKey(CacheResourceType.CATEGORY, id, CacheResourceType.RECIPE),
			() => recipeService.findByCategoryId(id as string)
		);

		res.status(StatusCodes.OK).json(recipes);
	}

	async paginationByCategoryId(req: Request, res: Response) {
		const { categoryId, skip, limit } = req.query;
		// todo: add cache
		const recipes = await recipeService.paginationByCategoryId(
			categoryId as string,
			Number(skip),
			Number(limit)
		);
		res.status(200).json(recipes);
	}

	async create(req: Request, res: Response) {
		const createdRecipe = await recipeService.create(req.body);
		res.status(StatusCodes.CREATED).json(createdRecipe);

		eventsManager.emit('SET_RECIPE', { data: createdRecipe }); // with cache
	}

	async update(req: ExpressRecipeRequest, res: Response) {
		const { categoryId } = req.body;
		const { recipe } = req;

		if (categoryId) {
			await validateCategoryById(categoryId);
		}

		const updatedRecipe = await recipeService.update(recipe._id, req.body);
		res.status(StatusCodes.OK).json(updatedRecipe);

		eventsManager.emit('SET_RECIPE', { data: updatedRecipe }); // with cache
	}

	async delete(req: ExpressRecipeRequest, res: Response) {
		const { recipe } = req;

		await recipeService.delete(recipe._id);
		res.status(StatusCodes.OK).send();

		eventsManager.emit('DELETE_CATEGORY', { data: recipe }); // with cache
	}
}

export const recipeController = new RecipeController();
