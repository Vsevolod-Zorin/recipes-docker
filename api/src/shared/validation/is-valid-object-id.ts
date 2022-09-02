import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { BackendError } from '../backend.error';
import { BackendMessage } from '../backend.messages';

export const validateMongoId = (id: string, _object?: any): string => {
	const keys = Object.keys(_object);

	if (Types.ObjectId.isValid(id)) {
		if (String(new Types.ObjectId(id)) === id) {
			return id;
		}
	}

	throw new BackendError(StatusCodes.BAD_REQUEST, BackendMessage.BAD_REQUEST, {
		[`${keys[0]}`]: [`${keys[0]} ${BackendMessage.validation.MUST_BE_A_MONGODB_ID}`],
	});
};
