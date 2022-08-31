import { Router } from 'express';
import { errorHandler } from 'src/shared/error-handler';
import { validatorParamsId } from 'src/middlewares/validator-params-id.middleware';
import { recipeController } from 'src/controllers/recipe.controller';
import { validatorDto } from 'src/middlewares/validator-dto.middleware';
import { CreateRecipeDto } from 'src/shared/validation/recipe/dto/create-recipe-dto';
import { UpdateRecipeDto } from 'src/shared/validation/recipe/dto/update-recipe-dto';
import { validatorBodyId } from 'src/middlewares/validator-body-id.middleware';

const recipeRouter = Router();

recipeRouter
	.get('/', errorHandler(recipeController.findAll))
	.get('/:id', validatorParamsId(), errorHandler(recipeController.getById))
	.post('/', validatorDto(CreateRecipeDto), errorHandler(recipeController.create))
	.put('/', validatorDto(UpdateRecipeDto), validatorBodyId(), errorHandler(recipeController.update))
	.delete('/:id', validatorParamsId(), errorHandler(recipeController.delete));

export default recipeRouter;
