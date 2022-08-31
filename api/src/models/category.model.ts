import { UpdateWriteOpResult } from 'mongoose';
import { Category } from 'src/schema/Category';
import {
	ICategory,
	ICategoryCreate,
	ICategoryUpdate,
	ICategoryUpdateMany,
} from 'src/types/category/category.interface';
import { IQueryCategoryFindMany } from 'src/types/category/query-category-find-many.interface';
import { IQueryCategoryFindOne } from 'src/types/category/query-category-find-one.interface';

class CategoryModel {
	find(query: IQueryCategoryFindMany = {}): Promise<ICategory[]> {
		return Category.find(query).exec();
	}

	findOne(query: IQueryCategoryFindOne = {}): Promise<ICategory> {
		return Category.findOne(query).exec();
	}

	create(createCategoryDto: ICategoryCreate): Promise<ICategory> {
		return new Category(createCategoryDto).save();
	}

	update(id: string, dto: ICategoryUpdate): Promise<ICategory> {
		return Category.findOneAndUpdate({ _id: id }, { $set: { ...dto } }, { new: true }).exec();
	}

	// todo check tests after change type Object to ICategoryUpdate
	updateMany(ids: string[], update: ICategoryUpdateMany): Promise<UpdateWriteOpResult> {
		return Category.updateMany({ id: { $in: ids } }, update).exec();
	}

	delete(id: string): Promise<ICategory> {
		return Category.findByIdAndDelete(id).exec();
	}
}

export const categoryModel = new CategoryModel();
