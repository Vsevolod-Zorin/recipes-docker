import { NextFunction, Response } from 'express';
import { OutgoingMessage } from 'http';
import { StatusCodes } from 'http-status-codes';
import { validate, ValidationError } from 'class-validator';
import { MongodbIdDto } from 'src/shared/validation/dto/mongodb-id.dto';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { ExpressCategoryRequest } from 'src/types/express/expressCategoryRequest.interface';
import { categoryService } from 'src/services/category.service';
import cacheManager, { CacheResourceType } from 'src/utils/cache.manager';
import { ICategory } from 'src/types/category/category.interface';

export function validatorCategoryParamsId() {
	return async function (
		req: ExpressCategoryRequest,
		res: Response,
		next: NextFunction
	): Promise<OutgoingMessage> {
		try {
			const { id } = req.params;

			const errors: ValidationError[] = await validate(
				Object.assign(new MongodbIdDto(), req.params)
			);
			const errorMessage = errors.reduce((acc, error) => {
				acc[error.property] = Object.values(error.constraints);
				return acc;
			}, {});

			if (Object.keys(errorMessage).length > 0) {
				throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.BAD_REQUEST, errorMessage);
			}

			let category = await cacheManager.getOrFetch<ICategory>(
				cacheManager.generateKey(CacheResourceType.CATEGORY, id),
				() => categoryService.findOne({ _id: id })
			);

			if (!category) {
				throw new BackendError(StatusCodes.NOT_FOUND, BackendMessage.NOT_FOUND);
			}

			req.category = category;
			next();
		} catch (e) {
			return res.status(e.code || 400).json({ ...e });
		}
	};
}
