import { categoryController } from '../controllers/category.controller';
import { Router } from 'express';
import { validatorDto } from 'src/middlewares/validator-dto.middleware';
import { createCategoryDto } from 'src/types/category/create-category.dto';
import { errorHandler } from 'src/shared/error-handler';
import { updateCategoryDto } from 'src/types/category/update-category.dto';

const categoryRouter = Router();

// todo: validation
categoryRouter
  .get('/', errorHandler(categoryController.find))
  .get('/:id', errorHandler(categoryController.getById))
  .post('/', validatorDto(createCategoryDto), errorHandler(categoryController.create))
  .put('/', validatorDto(updateCategoryDto), errorHandler(categoryController.update))
  .delete('/:id', categoryController.delete);

export default categoryRouter;
