import { Ref } from '@typegoose/typegoose';
import { Category } from 'src/schema/Category';

export interface IQueryPostFindOne {
	_id?: string;
	title?: string;
	description?: string;
	body?: string;
	categoryId?: Ref<typeof Category, string>;
}
