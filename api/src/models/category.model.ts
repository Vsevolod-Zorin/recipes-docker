import { UpdateWriteOpResult } from 'mongoose';
import { Category } from 'src/schema/Category';
import { ICategory, ICategoryCreate, ICategoryUpdate } from 'src/types/category/category.interface';
import { IQueryCategory } from 'src/types/category/query-category.interface';

class CategoryModel {
  // todo interface
  find(query: IQueryCategory = {}): Promise<ICategory[]> {
    return Category.find(query).exec();
  }

  findOne(query: IQueryCategory = {}): Promise<ICategory> {
    return Category.findOne(query).exec();
  }

  create(createCategoryDto: ICategoryCreate): Promise<ICategory> {
    return new Category(createCategoryDto).save();
  }

  update(id: string, dto: ICategoryUpdate): Promise<ICategory> {
    return Category.findOneAndUpdate({ _id: id }, { $set: { ...dto } }, { new: true }).exec();
  }

  updateMany(ids: string[], update: Object): Promise<UpdateWriteOpResult> {
    return Category.updateMany({ id: { $in: ids } }, update).exec();
  }

  delete(id: string): Promise<ICategory> {
    return Category.findByIdAndDelete(id).exec();
  }

  // delteMany(ids: string[]) {
  //   return Category.deleteMany({ id: { $in: ids } });
  // }
}

export const categoryModel = new CategoryModel();
