import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { validateCategoryByName } from 'src/shared/validation/category/category-check-name.validation';
import { ExpressCategoryRequest } from 'src/types/express/expressCategoryRequest.interface';

class CategoryController {
	async findAll(req: Request, res: Response) {
		const categories = await categoryService.getAll();
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
	}

	async update(req: ExpressCategoryRequest, res: Response) {
		// todo: check name exist in one branch
		const { category } = req;
		const updatedCategory = await categoryService.update(category._id, req.body);
		res.status(StatusCodes.OK).json(updatedCategory);
	}

	async delete(req: ExpressCategoryRequest, res: Response) {
		const { category } = req;
		await categoryService.deleteRecipes(category);
		await categoryService.deletePosts(category);
		await categoryService.moveChildsCategoryUp(category);
		await categoryService.delete(category._id);

		res.status(StatusCodes.OK).send();
	}
}

export const categoryController = new CategoryController();
