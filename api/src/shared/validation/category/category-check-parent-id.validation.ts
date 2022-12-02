import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { ICategory } from 'src/types/category/category.interface';
import cacheManager, { CacheResourceType } from 'src/utils/cache.manager';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export const validateCategoryByParentId = async (
	category: ICategory,
	dto: UpdateCategoryDto
): Promise<Boolean> => {
	// todo from arr
	if (dto.parentId && dto.parentId !== null) {
		// let checkedCategory: ICategory = await categoryService.findOne({
		// 	_id: dto.parentId.toString(),
		// });
		let checkedCategory: ICategory = await cacheManager.getOrFetch<ICategory>(
			cacheManager.generateKey(CacheResourceType.CATEGORY, dto.parentId.toString()),
			() =>
				categoryService.findOne({
					_id: dto.parentId.toString(),
				})
		);
		// todo think about array
		while (checkedCategory && checkedCategory.parentId !== null) {
			if (checkedCategory.parentId.toString() === category._id.toString()) {
				throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.UNCORRECT_PARENT_ID);
			}
			checkedCategory = await cacheManager.getOrFetch<ICategory>(
				cacheManager.generateKey(CacheResourceType.CATEGORY, checkedCategory.parentId),
				async () => {
					return await categoryService.findOne({ _id: checkedCategory.parentId.toString() });
				}
			);
		}
	}
	return true;
};
