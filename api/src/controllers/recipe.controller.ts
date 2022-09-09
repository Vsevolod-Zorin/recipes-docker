import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { recipeService } from 'src/services/recipe.service';
import { validateCategoryById } from 'src/shared/validation/category/category-get-by-id.validarion';
import { validateRecipeById } from 'src/shared/validation/recipe/recipe-get-by-id.validarion';
import { ExpressRecipeRequest } from 'src/types/express/expressRecipeRequest.interface';
import { ExpressRequest } from 'src/types/express/expressRequest.interface';
import { IQueryRecipeFindMany } from 'src/types/recipe/query-recipe-find-many.interface';

class RecipeController {
	async findAll(req: Request, res: Response) {
		const recipes = await recipeService.find();
		res.status(StatusCodes.OK).json(recipes);
	}

	async getById(req: ExpressRecipeRequest, res: Response) {
		const { recipe } = req;
		res.status(StatusCodes.OK).json(recipe);
	}
	async getByCategoryId(req: ExpressRecipeRequest, res: Response) {
		const { id } = req.query;
		await validateCategoryById(id as string);
		const recipes = await recipeService.findByCategoryId(id as string);
		res.status(StatusCodes.OK).json(recipes);
	}

	async create(req: Request, res: Response) {
		const createdRecipe = await recipeService.create(req.body);
		res.status(StatusCodes.CREATED).json(createdRecipe);
	}

	// todo make interface
	async update(req: ExpressRequest, res: Response) {
		const { id, categoryId } = req.body;
		await validateRecipeById(id);
		if (categoryId) {
			await validateCategoryById(categoryId);
		}
		const updatedRecipe = await recipeService.update(id, req.body);
		res.status(StatusCodes.OK).json(updatedRecipe);
	}

	async delete(req: ExpressRecipeRequest, res: Response) {
		const { recipe } = req;
		await recipeService.delete(recipe._id);
		res.status(StatusCodes.OK).send();
	}
}

export const recipeController = new RecipeController();
