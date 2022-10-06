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
	if (dto.parentId) {
		const childrens = await categoryService.getByParentId(category._id);
		childrens.forEach(el => {
			if (el._id.toString() === dto.parentId.toString()) {
				throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.UNCORRECT_PARENT_ID);
			}
		});
	}
	return true;
};
