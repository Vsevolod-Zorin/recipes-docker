import { StatusCodes } from 'http-status-codes';
import { categoryModel } from 'src/models/category.model';
import { BackendError } from '../../backend.error';
import { BackendMessage } from '../../backend.messages';
import { Category } from 'src/schema/Category';
import { Document } from 'mongoose';

export const validateCategoryByName = async (name: string): Promise<Document<typeof Category>> => {
  const category = await categoryModel.findOne({ name });

  if (category) {
    throw new BackendError(StatusCodes.NOT_FOUND, BackendMessage.NAME_EXIST);
  }
  return category;
};
