import { Router } from 'express';
import { validatorDto } from 'src/middlewares/validator-dto.middleware';
import { errorHandler } from 'src/shared/error-handler';
import { categoryController } from 'src/controllers/category.controller';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { UpdateCategoryDto } from 'src/types/category/update-category.dto';

const categoryRouter = Router();

// todo: validation
categoryRouter
  .get('/', errorHandler(categoryController.find))
  .get('/:id', errorHandler(categoryController.getById))
  .post('/', validatorDto(new CreateCategoryDto()), errorHandler(categoryController.create))
  .put('/', validatorDto(new UpdateCategoryDto()), errorHandler(categoryController.update))
  .delete('/:id', errorHandler(categoryController.delete));

export default categoryRouter;
