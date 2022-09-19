import { Ref } from '@typegoose/typegoose';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/schema/Category';
import { IPostCreate } from 'src/types/post/post.interface';

export class CreatePostDto implements IPostCreate {
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@IsString()
	@IsNotEmpty()
	readonly description: string;

	@IsString()
	@IsNotEmpty()
	readonly body: string;

	@IsMongoId()
	readonly categoryId: Ref<typeof Category, string>;
}
