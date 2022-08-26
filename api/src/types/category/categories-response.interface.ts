import { Document } from 'mongoose';
import { Category } from 'src/schema/Category';

export interface ICategoriesResponse {
  categories: Document<typeof Category>[];
}
