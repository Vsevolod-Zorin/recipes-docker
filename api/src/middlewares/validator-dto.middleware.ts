import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import { OutgoingMessage } from 'http';
import { StatusCodes } from 'http-status-codes';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { CreateCategoryDto } from 'src/shared/validation/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/shared/validation/dto/update-category.dto';
import { CreateRecipeDto } from 'src/shared/validation/dto/create-recipe-dto';
import { UpdateRecipeDto } from 'src/shared/validation/dto/update-recipe-dto';
import { CreatePostDto } from 'src/shared/validation/dto/create-post-dto';
import { UpdatePostDto } from 'src/shared/validation/dto/update-post-dto';

type InputDtoType =
	| typeof CreateCategoryDto
	| typeof UpdateCategoryDto
	| typeof CreateRecipeDto
	| typeof UpdateRecipeDto
	| typeof CreatePostDto
	| typeof UpdatePostDto;

export function validatorDto(DataTransferObject: InputDtoType) {
	return async function (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<OutgoingMessage> {
		try {
			const errors: ValidationError[] = await validate(
				Object.assign(new DataTransferObject(), req.body)
			);
			const errorMessage = errors.reduce((acc, error) => {
				acc[error.property] = Object.values(error.constraints);
				return acc;
			}, {});

			if (Object.keys(errorMessage).length > 0) {
				throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.BAD_REQUEST, errorMessage);
			}

			next();
		} catch (e) {
			return res.status(e.code || 400).json({ ...e });
		}
	};
}
