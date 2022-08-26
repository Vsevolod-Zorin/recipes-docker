import { Document } from 'mongoose';
import { Category } from 'src/schema/Category';
import { ICategoryCreate, ICategoryUpdate } from 'src/types/category/category.interface';
import { QueryCategoryType } from 'src/types/category/query-category.type';

class CategoryModel {
  find(query: QueryCategoryType = {}): Promise<Document<typeof Category>[]> {
    return Category.find(query).exec();
  }

  findOne(query: QueryCategoryType = {}): Promise<Document<typeof Category>> {
    return Category.findOne(query).exec();
  }

  create(createCategoryDto: ICategoryCreate): Promise<Document<typeof Category>> {
    return new Category(createCategoryDto).save();
  }

  update(
    category: Document<typeof Category>,
    dto: ICategoryUpdate
  ): Promise<Document<typeof Category>> {
    return Category.findByIdAndUpdate(dto.id, category).exec();
  }

  delete(id: string): Promise<Document<typeof Category>> {
    return Category.findByIdAndDelete(id).exec();
  }
}

export const categoryModel = new CategoryModel();
