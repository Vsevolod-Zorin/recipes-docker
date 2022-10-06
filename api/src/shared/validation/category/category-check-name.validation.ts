import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';

export const validateCategoryByName = async (name: string, parentId: string): Promise<Boolean> => {
	const category = await categoryService.findOne({ name, parentId });

	if (category) {
		throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.NAME_EXIST);
	}
	return true;
};
