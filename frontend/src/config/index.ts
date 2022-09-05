export enum Envs {
	development = 'development',
	production = 'production',
}

export interface IConfig {
	getEnv: () => Envs;
}

export const config: IConfig = {
	getEnv(): Envs {
		return process.env.NODE_ENV as Envs;
	},
};
