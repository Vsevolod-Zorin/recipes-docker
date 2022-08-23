import { StatusCodes } from 'http-status-codes';
import { Document } from 'mongoose';
import { Category } from 'src/schema/Category';
import { categoryService } from 'src/services/category.service';
import { BackendError } from '../../backend.error';
import { BackendMessage } from '../../backend.messages';

export const validateCategoryById = async (id: string): Promise<Document<typeof Category>> => {
  const category = await categoryService.findOne({ _id: id });

  if (!category) {
    throw new BackendError(StatusCodes.NOT_FOUND, BackendMessage.NOT_FOUND);
  }
  return category;
};
