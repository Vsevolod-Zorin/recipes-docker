import { Document } from 'mongoose';
import { Category } from 'src/schema/Category';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { QueryCategoryType } from 'src/types/category/query-category.type';
import { UpdateCategoryDto } from 'src/types/category/update-category.dto';

class CategoryModel {
  find(query: QueryCategoryType = {}) {
    return Category.find(query);
  }

  findOne(query: QueryCategoryType = {}) {
    return Category.findOne(query);
  }

  getById(id: string): Promise<Document<typeof Category>> {
    return Category.findById(id).toJSON().exec();
  }

  create(createCategoryDto: CreateCategoryDto): Promise<Document<typeof Category>> {
    return new Category(createCategoryDto).save();
  }

  async update(
    category: Document<typeof Category>,
    dto: UpdateCategoryDto
  ): Promise<Document<typeof Category>> {
    return Category.findByIdAndUpdate(dto.id, category);
  }

  // async delete(id: string) {
  //   return await Category.findByIdAndDelete(id);
  // }
}

export const categoryModel = new CategoryModel();
