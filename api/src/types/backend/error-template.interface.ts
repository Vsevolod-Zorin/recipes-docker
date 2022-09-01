export interface IErrorTemplate {
	[key: string]: string[];
}

export interface IBackendError {
	code: number;
	message: string;
	error?: IErrorTemplate;
}
