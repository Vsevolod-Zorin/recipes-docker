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

  update(category: ICategory, dto: UpdateCategoryDto): Promise<ICategory> {
    Object.assign(category, dto);
    // todo update here or
    return categoryModel.update(category, dto);
  }

  async delete(id: string, category: ICategory): Promise<ICategory> {
    // todo deltete refs

    const query: QueryCategoryType = {
      parentId: category._id,
    };
    const categories: ICategory[] = await this.find(query);

    categories.forEach(async el => {});

    return categoryModel.delete(id);
  }

  async moveChildsCategory() {}
}

export const categoryService = new CategoryService();
