import { IBackendError, IErrorTemplate } from 'src/types/backend/error-template.interface';

export class BackendError implements IBackendError {
	constructor(readonly code: number, readonly message: string, readonly error?: IErrorTemplate) {}
}
