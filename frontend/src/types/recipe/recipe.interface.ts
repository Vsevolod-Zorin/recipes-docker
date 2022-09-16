export interface IRecipe {
	_id: string;
	title: string;
	description: string;
	categoryId: string;
	createdAt?: Date;
	updatedAt?: Date;
}
