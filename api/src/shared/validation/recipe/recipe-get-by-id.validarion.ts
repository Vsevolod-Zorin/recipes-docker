import { StatusCodes } from 'http-status-codes';
import { recipeService } from 'src/services/recipe.service';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { IRecipe } from 'src/types/recipe/recipe.interface';

export const validateRecipeById = async (id: string): Promise<IRecipe> => {
	const recipe = await recipeService.findOne({ _id: id });

	if (!recipe) {
		throw new BackendError(StatusCodes.NOT_FOUND, BackendMessage.NOT_FOUND);
	}
	return recipe;
};
