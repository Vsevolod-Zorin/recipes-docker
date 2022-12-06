import { UpdateWriteOpResult } from 'mongoose';
import { Recipe } from 'src/schema/Recipe';
import { IQueryRecipeFindMany } from 'src/types/recipe/query-recipe-find-many.interface';
import { IQueryRecipeFindOne } from 'src/types/recipe/query-recipe-find-one.interface';
import { IRecipe, IRecipeCreate, IRecipeUpdate } from 'src/types/recipe/recipe.interface';
import cacheManager from 'src/utils/cache.manager';

class RecipeModel {
	find(query: IQueryRecipeFindMany): Promise<IRecipe[]> {
		return cacheManager.recipe.find<IRecipe[]>(query, () => Recipe.find(query).exec());

		// return Recipe.find(query).exec();
	}

	findOne(query: IQueryRecipeFindOne): Promise<IRecipe> {
		return cacheManager.recipe.findOne<IRecipe>(query, () => Recipe.findOne(query).exec());

		// return Recipe.findOne(query).exec();
	}

	findByCategoryId(categoryId: string) {
		return this.find({ categoryId: [categoryId] });
		// return Recipe.find({ categoryId: id }).exec();
	}

	paginationByCategoryId(categoryId: string, skip: number, limit: number): Promise<IRecipe[]> {
		return cacheManager.recipe.find<IRecipe[]>({ categoryId, skip, limit }, () =>
			Recipe.find({ categoryId }).skip(skip).limit(limit).exec()
		);
		// return Recipe.find({ categoryId }).skip(skip).limit(limit).exec();
	}

	create(dto: IRecipeCreate): Promise<IRecipe> {
		cacheManager.recipe.flushAll();

		return new Recipe(dto).save();
	}

	update(id: string, dto: IRecipeUpdate): Promise<IRecipe> {
		cacheManager.recipe.flushAll();

		return Recipe.findOneAndUpdate({ _id: id }, { $set: { ...dto } }, { new: true }).exec();
	}

	updateMany(ids: string[], update: IRecipeUpdate): Promise<UpdateWriteOpResult> {
		return Recipe.updateMany({ id: { $in: ids } }, update).exec();
	}

	// todo type
	deleteMany(ids: string[]) {
		cacheManager.recipe.flushAll();
		return Recipe.deleteMany({ id: { $in: ids } });
	}

	deleteManyByCategoryId(categoryId: string) {
		cacheManager.recipe.flushAll();
		return Recipe.deleteMany({ categoryId });
	}

	delete(id: string): Promise<IRecipe> {
		cacheManager.recipe.flushAll();
		return Recipe.findByIdAndDelete(id).exec();
	}
}

export const recipeModel = new RecipeModel();
