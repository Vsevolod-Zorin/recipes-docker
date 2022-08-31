import { Ref } from '@typegoose/typegoose';
import { Category } from 'src/schema/Category';

export interface IRecipe {
	_id: string;
	title: string;
	description: string;
	categoryId: Ref<typeof Category, string>;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IRecipeCreate {
	title: string;
	description: string;
	categoryId: Ref<typeof Category, string>;
}

export interface IRecipeUpdate {
	id: string;
	title?: string;
	description?: string;
	categoryId?: Ref<typeof Category, string>;
}
