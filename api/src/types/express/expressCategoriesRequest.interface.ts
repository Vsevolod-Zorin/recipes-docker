import { Request } from 'express';
import { ICategory } from '../category/category.interface';

export interface ExpressCategoriesRequest extends Request {
	categories: ICategory[];
}
