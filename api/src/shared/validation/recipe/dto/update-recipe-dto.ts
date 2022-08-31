import { Ref } from '@typegoose/typegoose';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/schema/Category';
import { IRecipeUpdate } from 'src/types/recipe/recipe.interface';

export class UpdateRecipeDto implements IRecipeUpdate {
	@IsNotEmpty()
	@IsMongoId()
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
	@IsMongoId()
	readonly categoryId?: Ref<typeof Category, string>;
}
