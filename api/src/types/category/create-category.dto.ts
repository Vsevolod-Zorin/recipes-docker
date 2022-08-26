import { IsNotEmpty, IsString } from 'class-validator';
import { ICategoryCreate } from 'src/types/category/category.interface';

class CreateCategoryDto implements ICategoryCreate {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  readonly parentId: string | null;
}

export const createCategoryDto = new CreateCategoryDto();
