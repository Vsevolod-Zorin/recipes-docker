import { Category } from 'src/schema/Category';
import { ICategory, ICategoryCreate, ICategoryUpdate } from 'src/types/category/category.interface';
import { QueryCategoryType } from 'src/types/category/query-category.type';

class CategoryModel {
  find(query: QueryCategoryType = {}): Promise<ICategory[]> {
    return Category.find(query).exec();
  }

  findOne(query: QueryCategoryType = {}): Promise<ICategory> {
    return Category.findOne(query).exec();
  }

  create(createCategoryDto: ICategoryCreate): Promise<ICategory> {
    return new Category(createCategoryDto).save();
  }

  update(category: ICategory, dto: ICategoryUpdate): Promise<ICategory> {
    // todo: check save or
    return Category.findById(category._id).then(cat => Object.assign(cat, dto).save());
  }

  delete(id: string): Promise<ICategory> {
    return Category.findByIdAndDelete(id).exec();
  }
}

export const categoryModel = new CategoryModel();
