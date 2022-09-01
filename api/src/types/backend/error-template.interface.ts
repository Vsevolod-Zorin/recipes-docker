export interface IErrorTemplate {
	[key: string]: string[];
}

export interface IBackendError {
	message: string;
	error?: IErrorTemplate;
}
