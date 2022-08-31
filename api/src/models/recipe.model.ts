import { Recipe } from 'src/schema/Recipe';
import { IRecipe } from 'src/types/recipe/recipe.interface';

class RecipeModel {
	find() {}

	findOne() {}

	create() {}

	update() {}

	updateMany() {}

	delete(id: string): Promise<IRecipe> {
		return Recipe.findByIdAndDelete(id).exec();
	}
}

export const recipeModel = new RecipeModel();
