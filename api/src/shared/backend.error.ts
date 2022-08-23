import { IErrorTemplate } from 'src/types/backend/error-template.interface';

export class BackendError {
  constructor(
    readonly statusCode: number,
    readonly message?: string,
    readonly error?: IErrorTemplate
  ) {}
}