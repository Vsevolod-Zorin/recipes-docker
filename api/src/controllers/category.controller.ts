import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from 'src/services/category.service';
import { validateCategoryById } from 'src/shared/validation/category/category-get-by-id.validarion';
import { ExpressRequest } from 'src/types/express/expressRequest.interface';
import { ExpressCategoryRequest } from 'src/types/express/expressCategoryRequest.interface';

class CategoryController {
	async findAll(req: Request, res: Response) {
		const categories = await categoryService.find();
		res.status(StatusCodes.OK).json(categories);
	}

	async getById(req: ExpressCategoryRequest, res: Response) {
		const { category } = req;
		console.log('=== log', { category });
		res.status(StatusCodes.OK).json(category);
	}

	async create(req: Request, res: Response) {
		// todo: check name exist in one branch
		const createdCategory = await categoryService.create(req.body);
		res.status(StatusCodes.CREATED).json(createdCategory);
	}

	async update(req: ExpressRequest, res: Response) {
		// todo: check name exist in one branch
		// todo: typing
		const { id } = req.body;
		await validateCategoryById(id);
		const updatedCategory = await categoryService.update(id.toString(), req.body);
		res.status(StatusCodes.OK).json(updatedCategory);
	}

	async delete(req: ExpressCategoryRequest, res: Response) {
		const { category } = req;
		await categoryService.moveChildsCategoryUp(category);
		await categoryService.delete(category._id);

		res.status(StatusCodes.OK).send();
	}
}

export const categoryController = new CategoryController();
