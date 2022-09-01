import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ICategoryUpdate } from 'src/types/category/category.interface';

export class UpdateCategoryDto implements ICategoryUpdate {
	// !@IsMongoIdString()
	@IsMongoId()
	readonly id: string;

	@IsOptional()
	@IsString()
	readonly name?: string;

	@IsOptional()
	@IsMongoId()
	readonly parentId?: string;
}
