import { UpdateWriteOpResult } from 'mongoose';
import { Recipe } from 'src/schema/Recipe';
import { IQueryRecipeFindMany } from 'src/types/recipe/query-recipe-find-many.interface';
import { IQueryRecipeFindOne } from 'src/types/recipe/query-recipe-find-one.interface';
import { IRecipe, IRecipeCreate, IRecipeUpdate } from 'src/types/recipe/recipe.interface';
import cacheManager from 'src/utils/cache.manager';
import eventsManager from 'src/utils/evens.manager';

class RecipeModel {
	find(query: IQueryRecipeFindMany): Promise<IRecipe[]> {
		return cacheManager.recipe.find<IRecipe[]>(query, () => Recipe.find(query).exec());
	}

	findOne(query: IQueryRecipeFindOne): Promise<IRecipe> {
		return cacheManager.recipe.findOne<IRecipe>(query, () => Recipe.findOne(query).exec());
	}

	findByCategoryId(categoryId: string): Promise<IRecipe[]> {
		return this.find({ categoryId: [categoryId] });
	}

	paginationByCategoryId(categoryId: string, skip: number, limit: number): Promise<IRecipe[]> {
		return cacheManager.recipe.find<IRecipe[]>({ categoryId, skip, limit }, () =>
			Recipe.find({ categoryId }).skip(skip).limit(limit).exec()
		);
	}

	create(dto: IRecipeCreate): Promise<IRecipe> {
		eventsManager.emit('CLEAN_CACHE', { data: '' });
		return new Recipe(dto).save();
	}

	update(id: string, dto: IRecipeUpdate): Promise<IRecipe> {
		eventsManager.emit('CLEAN_CACHE', { data: '' });
		return Recipe.findOneAndUpdate({ _id: id }, { $set: { ...dto } }, { new: true }).exec();
	}

	updateMany(ids: string[], update: IRecipeUpdate): Promise<UpdateWriteOpResult> {
		return Recipe.updateMany({ id: { $in: ids } }, update).exec();
	}

	deleteMany(ids: string[]) {
		eventsManager.emit('CLEAN_CACHE', { data: '' });
		return Recipe.deleteMany({ id: { $in: ids } });
	}

	deleteManyByCategoryId(categoryId: string) {
		eventsManager.emit('CLEAN_CACHE', { data: '' });
		return Recipe.deleteMany({ categoryId });
	}

	delete(id: string): Promise<IRecipe> {
		eventsManager.emit('CLEAN_CACHE', { data: '' });
		return Recipe.findByIdAndDelete(id).exec();
	}
}

export const recipeModel = new RecipeModel();
