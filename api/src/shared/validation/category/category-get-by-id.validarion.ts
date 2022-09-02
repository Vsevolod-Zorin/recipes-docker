import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { ICategory } from 'src/types/category/category.interface';

export const validateCategoryById = async (id: string): Promise<ICategory> => {
	const category = await categoryService.findOne({ _id: id });

	if (!category) {
		throw new BackendError(StatusCodes.NOT_FOUND, BackendMessage.NOT_FOUND);
	}
	return category;
};
