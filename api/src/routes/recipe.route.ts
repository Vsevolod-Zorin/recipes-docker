import { Router } from 'express';
import { errorHandler } from 'src/shared/error-handler';
import { recipeController } from 'src/controllers/recipe.controller';
import { validatorDto } from 'src/middlewares/validator-dto.middleware';
import { CreateRecipeDto } from 'src/shared/validation/dto/create-recipe-dto';
import { UpdateRecipeDto } from 'src/shared/validation/dto/update-recipe-dto';
import { validatorRecipeParamsId } from 'src/middlewares/validator-recipe-params-id.middleware';

const recipeRouter = Router();

recipeRouter
	.get('/', errorHandler(recipeController.findAll))
	.get('/test', errorHandler(recipeController.getByCategoryId))
	.get('/:id', validatorRecipeParamsId(), errorHandler(recipeController.getById))
	.post('/', validatorDto(CreateRecipeDto), errorHandler(recipeController.create))
	.put('/', validatorDto(UpdateRecipeDto), errorHandler(recipeController.update))
	.delete('/:id', validatorRecipeParamsId(), errorHandler(recipeController.delete));

export default recipeRouter;
