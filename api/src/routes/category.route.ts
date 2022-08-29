import { Router } from 'express';
import { validatorDto } from 'src/middlewares/validator-dto.middleware';
import { errorHandler } from 'src/shared/error-handler';
import { categoryController } from 'src/controllers/category.controller';
import { CreateCategoryDto } from 'src/types/category/create-category.dto';
import { UpdateCategoryDto } from 'src/types/category/update-category.dto';
import { validatorParamsId } from 'src/middlewares/validator-params-id.middleware';
import { validatorBodyId } from 'src/middlewares/validator-body-id.middleware';

const categoryRouter = Router();

// todo: validation
categoryRouter
  .get('/', errorHandler(categoryController.find))
  .get('/:id', validatorParamsId(), errorHandler(categoryController.getById))
  .post('/', validatorDto(CreateCategoryDto), errorHandler(categoryController.create))
  .put(
    '/',
    validatorBodyId(),
    validatorDto(UpdateCategoryDto),
    errorHandler(categoryController.update)
  )
  .delete('/:id', validatorParamsId(), errorHandler(categoryController.delete));

export default categoryRouter;
