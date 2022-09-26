import { Ref } from '@typegoose/typegoose';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/schema/Category';
import { IPostUpdate } from 'src/types/post/post.interface';
import { IsMongoIdString } from '../decorators/is-mongodb-id-string';

export class UpdatePostDto implements IPostUpdate {
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
	@IsString()
	readonly body?: string;

	@IsOptional()
	@IsMongoId()
	readonly categoryId?: Ref<typeof Category, string>;
}
