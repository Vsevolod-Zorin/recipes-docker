import { Router } from 'express';
import { validatorDto } from 'src/middlewares/validator-dto.middleware';
import { errorHandler } from 'src/shared/error-handler';
import { categoryController } from 'src/controllers/category.controller';
import { CreateCategoryDto } from 'src/shared/validation/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/shared/validation/category/dto/update-category.dto';
import { validatorParamsId } from 'src/middlewares/validator-params-id.middleware';
import { validatorBodyId } from 'src/middlewares/validator-body-id.middleware';

const categoryRouter = Router();

categoryRouter
  .get('/', errorHandler(categoryController.findAll))
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
