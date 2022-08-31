import { Ref } from '@typegoose/typegoose';
import { Category } from 'src/schema/Category';

export interface IQueryRecipeFindMany {
	_id?: string[];
	title?: string[];
	description?: string[];
	categoryid?: Ref<typeof Category, string>[];
}
