import { UpdateWriteOpResult } from 'mongoose';
import { Category } from 'src/schema/Category';
import {
	ICategory,
	ICategoryCreate,
	ICategoryUpdate,
	ICategoryUpdateMany,
} from 'src/types/category/category.interface';
import { IQueryCategoryFindOne } from 'src/types/category/query-category-find-one.interface';
import { EntityStatusEnum } from 'src/types/entity-status.enum';

class CategoryModel {
	find(query = {}): Promise<ICategory[]> {
		return Category.find({ ...query, status: EntityStatusEnum.ACTIVE }).exec();
	}

	findOne(query: IQueryCategoryFindOne = {}): Promise<ICategory> {
		return Category.findOne({ ...query, status: EntityStatusEnum.ACTIVE }).exec();
	}

	create(createCategoryDto: ICategoryCreate): Promise<ICategory> {
		return new Category(createCategoryDto).save();
	}

	update(id: string, dto: ICategoryUpdate): Promise<ICategory> {
		return Category.findOneAndUpdate(
			{ _id: id, status: EntityStatusEnum.ACTIVE },
			{ $set: { ...dto } },
			{ new: true }
		).exec();
	}

	changeStatus(id: string, status: EntityStatusEnum): Promise<ICategory> {
		return Category.findOneAndUpdate(
			{ _id: id, status: EntityStatusEnum.ACTIVE },
			{ $set: { status } },
			{ new: true }
		).exec();
	}

	// todo check tests after change type Object to ICategoryUpdate
	updateMany(ids: string[], update: ICategoryUpdateMany): Promise<UpdateWriteOpResult> {
		return Category.updateMany(
			{ _id: { $in: ids }, status: EntityStatusEnum.ACTIVE },
			update
		).exec();
	}

	updateManyByParentId(
		parentId: string,
		update: ICategoryUpdateMany
	): Promise<UpdateWriteOpResult> {
		return Category.updateMany({ parentId, status: EntityStatusEnum.ACTIVE }, update).exec();
	}

	delete(id: string): Promise<ICategory> {
		return Category.findByIdAndDelete(id).exec();
	}

	deleteAll() {
		return Category.deleteMany();
	}
}

export const categoryModel = new CategoryModel();
