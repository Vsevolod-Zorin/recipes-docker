import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { ICategory } from 'src/types/category/category.interface';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export const validateCategoryByParentId = async (
	category: ICategory,
	dto: UpdateCategoryDto
): Promise<Boolean> => {
	// todo from arr
	const categories = await categoryService.getAll();

	if (dto.parentId && dto.parentId !== null) {
		let checkedCategory: ICategory = categories.find(el => el._id === dto.parentId.toString());

		while (checkedCategory && checkedCategory.parentId !== null) {
			if (checkedCategory.parentId.toString() === category._id.toString()) {
				throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.UNCORRECT_PARENT_ID);
			}

			checkedCategory = categories.find(el => el._id === checkedCategory.parentId);
		}
	}
	return true;
};
