import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { validateCategoryByName } from 'src/shared/validation/category/category-check-name.validation';
import { validateCategoryByParentId } from 'src/shared/validation/category/category-check-parent-id.validation';
import { ICategory } from 'src/types/category/category.interface';
import { EntityStatusEnum } from 'src/types/entity-status.enum';
import { ExpressCategoriesRequest } from 'src/types/express/expressCategoriesRequest.interface';
import { ExpressCategoryRequest } from 'src/types/express/expressCategoryRequest.interface';
import cacheManager, { CacheResourceType } from 'src/utils/cache.manager';
import eventsManager from 'src/utils/evens-manager';

class CategoryController {
	async findAll(req: ExpressCategoriesRequest, res: Response) {
		let categories = await cacheManager.getOrFetch<ICategory[]>(
			`${CacheResourceType.CATEGORY}`,
			() => {
				return categoryService.getAll();
			}
		);
		res.status(StatusCodes.OK).json(categories);
	}

	async getById(req: ExpressCategoryRequest, res: Response) {
		const { category } = req;
		res.status(StatusCodes.OK).json(category);
	}

	async create(req: Request, res: Response) {
		// todo: check name exist in one branch
		await validateCategoryByName(req.body.name, req.body.parentId);
		const createdCategory = await categoryService.create(req.body);
		res.status(StatusCodes.CREATED).json(createdCategory);
		// todo new event?
		await cacheManager.create(
			`${CacheResourceType.CATEGORY}.${createdCategory._id}`,
			createdCategory
		);
		await cacheManager.delAsync(`${CacheResourceType.CATEGORY}`);
		// CQRS command query responsobility segrigation
	}

	async update(req: ExpressCategoryRequest, res: Response) {
		// todo: check name exist in one b634005cb742b0fa30a0c74ebranch
		const { category } = req;
		await validateCategoryByParentId(category, req.body);
		const updatedCategory = await categoryService.update(category._id, req.body);
		res.status(StatusCodes.OK).json(updatedCategory);

		// todo: new event or actions on memory without called additional functionals
		await cacheManager.create(
			`${CacheResourceType.CATEGORY}.${updatedCategory._id}`,
			updatedCategory
		);
		await cacheManager.delAsync(`${CacheResourceType.CATEGORY}`);
	}

	async delete(req: ExpressCategoryRequest, res: Response) {
		const { category } = req;

		await categoryService.moveChildsCategoryUp(category);
		await categoryService.changeStatus(category._id, EntityStatusEnum.ARCHIVED);
		eventsManager.emit('DELETE_CATEGORY', { data: category._id.toString() }); // with cache

		res.status(StatusCodes.OK).send();
	}
}

export const categoryController = new CategoryController();
