import { IBackendError, IErrorTemplate } from 'src/types/backend/error-template.interface';

export class BackendError implements IBackendError {
	constructor(readonly message: string, readonly error?: IErrorTemplate) {}
}
