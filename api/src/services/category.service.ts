import { Document } from 'mongoose';
import { categoryModel } from 'src/models/category.model';
import { Category } from 'src/schema/Category';
import { QueryCategoryType } from 'src/types/category/query-category.type';
import { createCategoryDto } from 'src/types/category/create-category.dto';
import { updateCategoryDto } from 'src/types/category/update-category.dto';

export class CategoryService {
  find(query: QueryCategoryType = {}): Promise<Document<typeof Category>[]> {
    return categoryModel.find(query);
  }

  findOne(query: QueryCategoryType = {}): Promise<Document<typeof Category>> {
    return categoryModel.findOne(query);
  }

  create(dto: typeof createCategoryDto): Promise<Document<typeof Category>> {
    return categoryModel.create(dto);
  }

  update(
    category: Document<typeof Category>,
    dto: typeof updateCategoryDto
  ): Promise<Document<typeof Category>> {
    Object.assign(category, dto);
    return categoryModel.update(category, dto);
  }

  delete(id: string): Promise<Document<typeof Category>> {
    return categoryModel.delete(id);
  }
}

export const categoryService = new CategoryService();
