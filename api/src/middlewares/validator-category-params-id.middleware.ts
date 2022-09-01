import { NextFunction, Response } from 'express';
import { OutgoingMessage } from 'http';
import { validate, ValidationError } from 'class-validator';
import { MongodbIdDto } from 'src/shared/validation/dto/mongodb-id.dto';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { StatusCodes } from 'http-status-codes';
import { ExpressCategoryRequest } from 'src/types/express/expressCategoryRequest.interface';
import { categoryService } from 'src/services/category.service';

export function validatorCategoryParamsId() {
	return async function (
		req: ExpressCategoryRequest,
		res: Response,
		next: NextFunction
	): Promise<OutgoingMessage> {
		try {
			const { id } = req.params;
			console.log('--- validatorCategoryParamsId id', { id });

			const errors: ValidationError[] = await validate(Object.assign(new MongodbIdDto(), id));
			console.log('--- validatorCategoryParamsId errors', { errors });
			const errorMessage = errors.reduce((acc, error) => {
				acc[error.property] = Object.values(error.constraints);
				return acc;
			}, {});

			console.log('--- validatorCategoryParamsId errorMessage', { errorMessage });
			if (Object.keys(errorMessage).length > 0) {
				throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.BAD_REQUEST, errorMessage);
			}

			const category = await categoryService.findOne({ _id: id });
			console.log('--- validatorCategoryParamsId errorMessage', { category });

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
