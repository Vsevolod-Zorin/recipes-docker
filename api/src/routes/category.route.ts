import { Router } from 'express';
import { validatorDto } from 'src/middlewares/validator-dto.middleware';
import { errorHandler } from 'src/shared/error-handler';
import { categoryController } from 'src/controllers/category.controller';
import { CreateCategoryDto } from 'src/shared/validation/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/shared/validation/dto/update-category.dto';
import { validatorCategoryParamsId } from 'src/middlewares/validator-category-params-id.middleware';

const categoryRouter = Router();

categoryRouter
	.get('/', errorHandler(categoryController.findAll))
	.get('/:id', validatorCategoryParamsId(), errorHandler(categoryController.getById))
	.post('/', validatorDto(CreateCategoryDto), errorHandler(categoryController.create))
	.put(
		'/:id',
		validatorCategoryParamsId(),
		validatorDto(UpdateCategoryDto),
		errorHandler(categoryController.update)
	)
	.delete('/:id', validatorCategoryParamsId(), errorHandler(categoryController.delete));

export default categoryRouter;
