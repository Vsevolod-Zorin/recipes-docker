import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { recipeService } from 'src/services/recipe.service';
import { validateRecipeById } from 'src/shared/validation/recipe/recipe-get-by-id.validarion';
import { ExpressRecipeRequest } from 'src/types/express/expressRecipeRequest.interface';
import { ExpressRequest } from 'src/types/express/expressRequest.interface';

class RecipeController {
	async findAll(req: Request, res: Response) {
		const recipes = recipeService.find();
		res.status(StatusCodes.OK).json(recipes);
	}

	async getById(req: ExpressRecipeRequest, res: Response) {
		const { recipe } = req;
		res.status(StatusCodes.OK).json(recipe);
	}

	async create(req: Request, res: Response) {
		const createdRecipe = await recipeService.create(req.body);
		res.status(StatusCodes.CREATED).json(createdRecipe);
	}

	async update(req: ExpressRequest, res: Response) {
		const { id } = req.body;
		await validateRecipeById(id);
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
