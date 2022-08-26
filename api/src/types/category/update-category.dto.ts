import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ICategoryUpdate } from './category.interface';

class UpdateCategoryDto implements ICategoryUpdate {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly parentId?: string | null;
}

export const updateCategoryDto = new UpdateCategoryDto();
