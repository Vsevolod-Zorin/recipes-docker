import { convertSearchConfigToQueryConfig } from 'src/helpers/query-converter';
import { categoryModel } from 'src/models/category.model';
import { ICategory, ICategoryCreate, ICategoryUpdate } from 'src/types/category/category.interface';
import { IQueryCategoryFindMany } from 'src/types/category/query-category-find-many.interface';
import { IQueryCategoryFindOne } from 'src/types/category/query-category-find-one.interface';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import { recipeService } from './recipe.service';

export class CategoryService {
	getAll(): Promise<ICategory[]> {
		return categoryModel.find();
	}

	findOne(query: IQueryCategoryFindOne = {}): Promise<ICategory> {
		return categoryModel.findOne(query);
	}

	getByParentId(parentId: string): Promise<ICategory[]> {
		return categoryModel.find({ parentId });
	}

	create(dto: ICategoryCreate): Promise<ICategory> {
		return categoryModel.create(dto);
	}

	update(id: string, dto: ICategoryUpdate): Promise<ICategory> {
		return categoryModel.update(id, dto);
	}

	delete(id: string): Promise<ICategory> {
		return categoryModel.delete(id);
	}

	async moveChildsCategoryUp(category: ICategory) {
		const categories: ICategory[] = await this.getByParentId(category._id);

		categories.forEach(async el => {
			await this.update(el._id, { parentId: category.parentId, id: el._id });
		});
		// todo fix update Many
		// const ids = categories.map(el => el._id.toString());
		// return await categoryModel.updateMany(ids, { parentId: category.parentId });
		return;
	}

	async deleteRecipes(category: ICategory) {
		const id = category._id.toString();
		const recipes: IRecipe[] = await recipeService.find({ categoryid: [id] });
		return await recipeService.deleteMany(recipes);
	}
}

export const categoryService = new CategoryService();
