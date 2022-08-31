import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { recipeService } from 'src/services/recipe.service';
import { validateMongoId } from 'src/shared/validation/is-valid-object-id';
import { validateRecipeById } from 'src/shared/validation/recipe/recipe-get-by-id.validarion';
import { ExpressRequest } from 'src/types/express/expressRequest.interface';

class RecipeController {
	async findAll(req: Request, res: Response) {
		const recipes = recipeService.find();
		res.status(StatusCodes.OK).json(recipes);
	}

	async getById(req: ExpressRequest, res: Response) {
		const { id } = req;
		const verifiedId = validateMongoId(id);
		const recipe = await validateRecipeById(verifiedId);
		res.status(StatusCodes.OK).json(recipe);
	}

	async create(req: Request, res: Response) {
		const createdRecipe = await recipeService.create(req.body);
		res.status(StatusCodes.CREATED).json(createdRecipe);
	}

	async update(req: ExpressRequest, res: Response) {
		const { id } = req;
		await validateRecipeById(id);
		const updatedRecipe = await recipeService.update(id, req.body);
		res.status(StatusCodes.OK).json(updatedRecipe);
	}

	async delete(req: ExpressRequest, res: Response) {
		const { id } = req;
		const verifiedId = validateMongoId(id);
		await recipeService.delete(verifiedId);
		res.status(StatusCodes.OK).send();
	}
}

export const recipeController = new RecipeController();
