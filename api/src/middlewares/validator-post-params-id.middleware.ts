import { NextFunction, Response } from 'express';
import { OutgoingMessage } from 'http';
import { StatusCodes } from 'http-status-codes';
import { validate, ValidationError } from 'class-validator';
import { MongodbIdDto } from 'src/shared/validation/dto/mongodb-id.dto';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { ExpressPostRequest } from 'src/types/express/expressPostRequest.interface';
import { postService } from 'src/services/post.service';

export function validatorPostParamsId() {
	return async function (
		req: ExpressPostRequest,
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

			const post = await postService.findOne({ _id: id });
			if (!post) {
				throw new BackendError(StatusCodes.NOT_FOUND, BackendMessage.NOT_FOUND);
			}

			req.post = post;
			next();
		} catch (e) {
			return res.status(e.code || 400).json({ ...e });
		}
	};
}
