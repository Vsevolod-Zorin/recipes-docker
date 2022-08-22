import { Category } from 'src/schema/Category';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { QueryCategoryType } from 'src/types/category/query-category.type';
import { UpdateCategoryDto } from 'src/types/category/update-category.dto';

export class CategoryModel {
  async find(query: QueryCategoryType = {}) {
    return await Category.find(query).lean().exec();
  }

  // async getById(id: string): Promise<typeof Category> {
  //   return Category.findById(id);
  // }

  async create(createCategoryDto: CreateCategoryDto) {
    return await new Category(createCategoryDto).save();
  }

  // async update(updateCategoryDto: UpdateCategoryDto) {
  //   const { id } = updateCategoryDto;
  //   const data = { ...updateCategoryDto };
  //   delete data.id;

  //   return await Category.findByIdAndUpdate(id, data);
  // }

  // async delete(id: string) {
  //   return await Category.findByIdAndDelete(id);
  // }
}
