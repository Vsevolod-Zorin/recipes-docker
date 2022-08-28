import { categoryModel } from 'src/models/category.model';
import { QueryCategoryType } from 'src/types/category/query-category.type';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { UpdateCategoryDto } from 'src/types/category/update-category.dto';
import { ICategory } from 'src/types/category/category.interface';

export class CategoryService {
  find(query: QueryCategoryType = {}): Promise<ICategory[]> {
    return categoryModel.find(query);
  }

  findOne(query: QueryCategoryType = {}): Promise<ICategory> {
    return categoryModel.findOne(query);
  }

  create(dto: CreateCategoryDto): Promise<ICategory> {
    return categoryModel.create(dto);
  }

  // todo category? or id
  update(category: ICategory, dto: UpdateCategoryDto): Promise<ICategory> {
    Object.assign(category, dto);
    return categoryModel.update(category, dto);
  }

  async delete(id: string): Promise<ICategory> {
    return categoryModel.delete(id);
  }

  async moveChildsCategoryUp(category: ICategory) {
    const query: QueryCategoryType = {
      parentId: category._id,
    };

    const categories: ICategory[] = await this.find(query);
    const ids = categories.map(el => el._id);

    return await categoryModel.updateMany(ids, { parentId: category.parentId });
  }
  async removeChildsCategory() {
    // todo: recursive method
  }
}

export const categoryService = new CategoryService();
