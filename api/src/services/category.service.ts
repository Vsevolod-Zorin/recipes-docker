import { StatusCodes } from 'http-status-codes';
import { CategoryModel } from 'src/models/category.model';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { QueryCategoryType } from 'src/types/category/query-category.type';

export class CategoryService {
  constructor(readonly categoryRepository: CategoryModel) {}

  async find(query: QueryCategoryType = {}) {
    return await this.categoryRepository.find(query);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.find({ name: createCategoryDto.name });

    if (category) {
      throw new BackendError(StatusCodes.UNPROCESSABLE_ENTITY, BackendMessage.NAME_EXIST);
    }

    return await this.categoryRepository.create(createCategoryDto);
  }
}
