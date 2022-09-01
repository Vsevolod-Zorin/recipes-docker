import { Ref } from '@typegoose/typegoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/schema/Category';
import { IRecipeUpdate } from 'src/types/recipe/recipe.interface';
import { IsMongoIdString } from '../decorators/is-mongodb-id-string';

export class UpdateRecipeDto implements IRecipeUpdate {
	// @IsMongoId()
	@IsMongoIdString()
	readonly id: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	readonly title?: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	readonly description?: string;

	@IsOptional()
	@IsNotEmpty()
	// @IsMongoId()
	// @IsMongoIdString()
	readonly categoryId?: Ref<typeof Category, string>;
}
