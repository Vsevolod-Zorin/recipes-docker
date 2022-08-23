import { categoryController } from '../controllers/category.controller';
import * as express from 'express';
import { validatorDto } from 'src/middlewares/validator-dto.middleware';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { errorHandler } from 'src/shared/error-handler';

const categoryRouter = express.Router();

// todo: validation
categoryRouter
  .get('/', errorHandler(categoryController.find))
  .get('/:id', errorHandler(categoryController.getById))
  .post('/', validatorDto(new CreateCategoryDto()), errorHandler(categoryController.create))
  .put('/', validatorDto(new CreateCategoryDto()), errorHandler(categoryController.update))
  .delete('/:id', categoryController.delete);

export default categoryRouter;
