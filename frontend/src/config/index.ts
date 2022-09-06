export enum Envs {
	development = 'development',
	production = 'production',
}

export interface IConfig {
	api: IApi;
	getEnv: () => Envs;
}

export interface IApi {
	baseUrl: string;
}

export const config: IConfig = {
	api: {
		baseUrl: (process.env.apiBaseUrl as string) || 'http://localhost:4000',
	},
	getEnv(): Envs {
		return process.env.NODE_ENV as Envs;
	},
};
