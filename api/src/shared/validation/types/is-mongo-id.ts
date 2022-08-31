import { ValidateIf, ValidationOptions } from 'class-validator';
import { Types } from 'mongoose';
import { BackendMessage } from 'src/shared/backend.messages';

export function IsMongoIdSting(
	validationOptions: ValidationOptions = { message: BackendMessage.MUST_BE_A_MONGODB_ID }
) {
	return ValidateIf((_object, value) => !Types.ObjectId.isValid(value), validationOptions);
}
