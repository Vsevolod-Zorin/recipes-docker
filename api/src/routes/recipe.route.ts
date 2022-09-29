import { Router } from 'express';
import { errorHandler } from 'src/shared/error-handler';
import { recipeController } from 'src/controllers/recipe.controller';
import { validatorDto } from 'src/middlewares/validator-dto.middleware';
import { CreateRecipeDto } from 'src/shared/validation/dto/create-recipe-dto';
import { UpdateRecipeDto } from 'src/shared/validation/dto/update-recipe-dto';
import { validatorRecipeParamsId } from 'src/middlewares/validator-recipe-params-id.middleware';
import { validatorCategoryParamsId } from 'src/middlewares/validator-category-params-id.middleware';

const recipeRouter = Router();

// todo add pagination validation
recipeRouter
	.get('/pagination', errorHandler(recipeController.paginationByCategoryId))
	.get('/', errorHandler(recipeController.findAll))
	.get('/category/:id', validatorCategoryParamsId(), errorHandler(recipeController.getByCategoryId))
	.get('/:id', validatorRecipeParamsId(), errorHandler(recipeController.getById))
	.post('/', validatorDto(CreateRecipeDto), errorHandler(recipeController.create))
	.put(
		'/:id',
		validatorRecipeParamsId(),
		validatorDto(UpdateRecipeDto),
		errorHandler(recipeController.update)
	)
	.delete('/:id', validatorRecipeParamsId(), errorHandler(recipeController.delete));

export default recipeRouter;
