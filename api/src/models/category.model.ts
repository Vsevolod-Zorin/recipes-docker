import { Document } from 'mongoose';
import { Category } from 'src/schema/Category';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { QueryCategoryType } from 'src/types/category/query-category.type';
import { UpdateCategoryDto } from 'src/types/category/update-category.dto';

class CategoryModel {
  find(query: QueryCategoryType = {}): Promise<Document<typeof Category>[]> {
    return Category.find(query).exec();
  }

  findOne(query: QueryCategoryType = {}): Promise<Document<typeof Category>> {
    return Category.findOne(query).exec();
  }

  create(createCategoryDto: CreateCategoryDto): Promise<Document<typeof Category>> {
    return new Category(createCategoryDto).save();
  }

  update(
    category: Document<typeof Category>,
    dto: UpdateCategoryDto
  ): Promise<Document<typeof Category>> {
    return Category.findByIdAndUpdate(dto.id, category).exec();
  }

  delete(id: string): Promise<Document<typeof Category>> {
    return Category.findByIdAndDelete(id).exec();
  }
}

export const categoryModel = new CategoryModel();