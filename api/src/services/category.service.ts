import { CategoryModel } from 'src/models/category.model';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { QueryCategoryType } from 'src/types/category/query-category.type';
import { Category } from '../schema/Category';

export class CategoryService {
  constructor(readonly categoryRepository: CategoryModel) {}

  async find(query: QueryCategoryType = {}) {
    return await this.categoryRepository.find(query);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.find({ name: createCategoryDto.name });

    if (category) {
      // todo make custom classError
      throw new Error('Category name already exist');
    }

    return await this.categoryRepository.create(createCategoryDto);
  }
}
