import { categoryModel } from 'src/models/category.model';
import { ICategory, ICategoryCreate, ICategoryUpdate } from 'src/types/category/category.interface';
import { IQueryCategoryFindOne } from 'src/types/category/query-category-find-one.interface';
import { IPost } from 'src/types/post/post.interface';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import { postService } from './post.service';
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
		const ids = categories.map(el => el._id.toString());
		return await categoryModel.updateMany(ids, { parentId: category.parentId });
	}

	async deleteRecipes(category: ICategory) {
		const id = category._id.toString();
		const recipes: IRecipe[] = await recipeService.find({ categoryid: [id] });
		return await recipeService.deleteMany(recipes);
	}

	async deletePosts(category: ICategory) {
		const id = category._id.toString();
		const posts: IPost[] = await postService.find({ categoryid: [id] });
		return await postService.deleteMany(posts);
	}
}

export const categoryService = new CategoryService();
