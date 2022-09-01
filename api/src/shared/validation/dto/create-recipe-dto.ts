import { Ref } from '@typegoose/typegoose';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/schema/Category';
import { IRecipeCreate } from 'src/types/recipe/recipe.interface';

export class CreateRecipeDto implements IRecipeCreate {
	@IsNotEmpty()
	@IsString()
	readonly title: string;

	@IsNotEmpty()
	@IsString()
	readonly description: string;

	@IsNotEmpty()
	@IsString()
	@IsMongoId()
	readonly categoryId: Ref<typeof Category, string>;
}
