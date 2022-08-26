import { Document } from 'mongoose';
import { Category } from 'src/schema/Category';

export interface ICategoryResponse {
  category: Document<typeof Category>;
}
