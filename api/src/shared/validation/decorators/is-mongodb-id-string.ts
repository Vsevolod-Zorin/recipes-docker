import { ValidateIf, ValidationOptions } from 'class-validator';
import { BackendMessage } from 'src/shared/backend.messages';
import { validateMongoId } from '../is-valid-object-id';

export function IsMongoIdString(
	validationOptions: ValidationOptions = { message: BackendMessage.validation.MUST_BE_A_MONGODB_ID }
) {
	return ValidateIf((_object, value) => !validateMongoId(value), validationOptions);
}
