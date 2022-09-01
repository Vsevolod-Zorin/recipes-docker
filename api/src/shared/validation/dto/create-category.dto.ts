import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ICategoryCreate } from 'src/types/category/category.interface';

export class CreateCategoryDto implements ICategoryCreate {
	@IsNotEmpty()
	@IsString()
	readonly name: string;

	@IsOptional()
	@IsMongoId()
	readonly parentId?: string;
}
