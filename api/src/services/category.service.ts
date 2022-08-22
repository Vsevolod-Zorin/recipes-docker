import { StatusCodes } from 'http-status-codes';import { Document } from 'mongoose';
import { categoryModel } from 'src/models/category.model';
import { Category } from 'src/schema/Category';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { QueryCategoryType } from 'src/types/category/query-category.type';
import { UpdateCategoryDto } from 'src/types/category/update-category.dto';

export class CategoryService {
  async find(query: QueryCategoryType = {}) {
    return await categoryModel.find(query);
  }

  async create(dto: CreateCategoryDto) {
    const category = await categoryModel.findOne({ name: dto.name });

    if (category) {
      // todo check status
      throw new BackendError(StatusCodes.UNPROCESSABLE_ENTITY, BackendMessage.NAME_EXIST);
    }

    return await categoryModel.create(dto);
  }

  async update(category: Document<typeof Category>, dto: UpdateCategoryDto) {
    Object.assign(category, dto);
    return await categoryModel.update(category, dto);
  }
}

export const categoryService = new CategoryService();
