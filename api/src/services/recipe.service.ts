import { recipeModel } from 'src/models/recipe.model';
import { IQueryRecipeFindMany } from 'src/types/recipe/query-recipe-find-many.interface';
import { IQueryRecipeFindOne } from 'src/types/recipe/query-recipe-find-one.interface';
import { IRecipe, IRecipeCreate, IRecipeUpdate } from 'src/types/recipe/recipe.interface';

export class RecipeService {
	find(query: IQueryRecipeFindMany = {}): Promise<IRecipe[]> {
		return recipeModel.find(query);
	}

	findOne(query: IQueryRecipeFindOne): Promise<IRecipe> {
		return recipeModel.findOne(query);
	}

	create(dto: IRecipeCreate): Promise<IRecipe> {
		return recipeModel.create(dto);
	}

	update(id: string, dto: IRecipeUpdate): Promise<IRecipe> {
		return recipeModel.update(id, dto);
	}

	delete(id: string): Promise<IRecipe> {
		return recipeModel.delete(id);
	}

	// todo: delete type
	deleteMany(recipes: IRecipe[]) {
		const ids: string[] = recipes.map(el => el._id);
		return recipeModel.deleteMany(ids);
	}
}

export const recipeService = new RecipeService();
