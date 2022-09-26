import { Ref } from '@typegoose/typegoose';
import { Category } from 'src/schema/Category';

export interface IPost {
	_id: string;
	title: string;
	description: string;
	body: string;
	categoryId: Ref<typeof Category, string>;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IPostCreate {
	title: string;
	description: string;
	body: string;
	categoryId: Ref<typeof Category, string>;
}

export interface IPostUpdate {
	id: string;
	title?: string;
	description?: string;
	body?: string;
	categoryId?: Ref<typeof Category, string>;
}
