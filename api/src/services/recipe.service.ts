import { recipeModel } from 'src/models/recipe.model';
import { IRecipe } from 'src/types/recipe/recipe.interface';

export class RecipeService {
	find() {}

	findOne() {}

	create() {}

	update() {}

	delete(id: string): Promise<IRecipe> {
		return recipeModel.delete(id);
	}
}

export const recipeService = new RecipeService();
