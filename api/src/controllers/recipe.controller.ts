import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { recipeService } from 'src/services/recipe.service';
import { validateCategoryById } from 'src/shared/validation/category/category-get-by-id.validarion';
import { ExpressRecipeRequest } from 'src/types/express/expressRecipeRequest.interface';

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
		const { id } = req.params;
		await validateCategoryById(id as string);
		const recipes = await recipeService.findByCategoryId(id as string);
		res.status(StatusCodes.OK).json(recipes);
	}

	async paginationByCategoryId(req: Request, res: Response) {
		const { categoryId, skip, limit } = req.query;

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
	}

	async update(req: ExpressRecipeRequest, res: Response) {
		const { categoryId } = req.body;
		const { recipe } = req;

		if (categoryId) {
			await validateCategoryById(categoryId);
		}
		const updatedRecipe = await recipeService.update(recipe._id, req.body);
		res.status(StatusCodes.OK).json(updatedRecipe);
	}

	async delete(req: ExpressRecipeRequest, res: Response) {
		const { recipe } = req;
		await recipeService.delete(recipe._id);
		res.status(StatusCodes.OK).send();
	}
}

export const recipeController = new RecipeController();
