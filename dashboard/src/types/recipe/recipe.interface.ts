export interface IRecipe {
	_id: string;
	title: string;
	description: string;
	categoryId: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IRecipeCreate {
	title: string;
	description: string;
	categoryId: string;
}

export interface IRecipeUpdate {
	id: string;
	title?: string;
	description?: string;
	categoryId?: string;
}

export interface IRecipeDelete {
	id: string;
	title: string;
	description: string;
	categoryId: string;
}
