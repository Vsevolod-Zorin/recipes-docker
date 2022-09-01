import { Ref } from '@typegoose/typegoose';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/schema/Category';
import { IRecipeCreate } from 'src/types/recipe/recipe.interface';

export class CreateRecipeDto implements IRecipeCreate {
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@IsString()
	@IsNotEmpty()
	readonly description: string;

	@IsMongoId()
	readonly categoryId: Ref<typeof Category, string>;
}
