import { IsNotEmpty, IsString } from 'class-validator';
import { IsNullable } from 'src/shared/validation/types/is-nullable';
import { ICategoryCreate } from 'src/types/category/category.interface';

export class CreateCategoryDto implements ICategoryCreate {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNullable()
  @IsString({ message: 'parentId must be a string or null' })
  readonly parentId: string | null;
}
