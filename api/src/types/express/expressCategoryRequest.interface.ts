import { Request } from 'express';
import { ICategory } from '../category/category.interface';

export interface ExpressCategoryRequest extends Request {
	category: ICategory;
}
