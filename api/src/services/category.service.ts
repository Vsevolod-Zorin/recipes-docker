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
		return categoryModel.updateManyByParentId(category._id, { parentId: category.parentId });
	}
}

export const categoryService = new CategoryService();
