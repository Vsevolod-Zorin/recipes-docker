import { Ref } from '@typegoose/typegoose';
import { Category } from 'src/schema/Category';

export interface IQueryPostFindMany {
	_id?: string[];
	title?: string[];
	description?: string[];
	body?: string[];
	categoryId?: Ref<typeof Category, string>[];
}
