import { categoryModel } from 'src/models/category.model';
import { ICategory, ICategoryCreate, ICategoryUpdate } from 'src/types/category/category.interface';
import { IQueryCategoryFindOne } from 'src/types/category/query-category-find-one.interface';
import { EntityStatusEnum } from 'src/types/entity-status.enum';

export class CategoryService {
	getAll(): Promise<ICategory[]> {
		return categoryModel.find();
	}

	findOne(query: IQueryCategoryFindOne = {}): Promise<ICategory> {
		return categoryModel.findOne(query);
	}

	create(dto: ICategoryCreate): Promise<ICategory> {
		return categoryModel.create(dto);
	}

	update(categoryId: string, dto: ICategoryUpdate): Promise<ICategory> {
		return categoryModel.update(categoryId, dto);
	}

	delete(categoryId: string): Promise<ICategory> {
		return categoryModel.delete(categoryId);
	}

	changeStatus(categoryId: string, status: EntityStatusEnum): Promise<ICategory> {
		return categoryModel.changeStatus(categoryId, status);
	}

	async moveChildsCategoryUp(category: ICategory) {
		return categoryModel.updateManyByParentId(category._id, { parentId: category.parentId });
	}
}

export const categoryService = new CategoryService();
