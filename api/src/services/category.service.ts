import { categoryModel } from 'src/models/category.model';
import { ICategory, ICategoryCreate, ICategoryUpdate } from 'src/types/category/category.interface';
import { IQueryCategoryFindMany } from 'src/types/category/query-category-find-many.interface';
import { IQueryCategoryFindOne } from 'src/types/category/query-category-find-one.interface';

export class CategoryService {
	find(query: IQueryCategoryFindMany = {}): Promise<ICategory[]> {
		return categoryModel.find(query);
	}

	findOne(query: IQueryCategoryFindOne = {}): Promise<ICategory> {
		return categoryModel.findOne(query);
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
		const query: IQueryCategoryFindMany = {
			parentId: category._id,
		};

		const categories: ICategory[] = await this.find(query);
		const ids = categories.map(el => el._id);

		return await categoryModel.updateMany(ids, { parentId: category.parentId });
	}
}

export const categoryService = new CategoryService();
