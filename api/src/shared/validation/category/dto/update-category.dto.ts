import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ICategoryUpdate } from 'src/types/category/category.interface';

export class UpdateCategoryDto implements ICategoryUpdate {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'parentId must be a string or null' })
  readonly parentId?: string | null;
}
