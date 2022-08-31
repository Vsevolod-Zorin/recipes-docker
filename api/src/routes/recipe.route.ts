import { Router } from 'express';
import { errorHandler } from 'src/shared/error-handler';
import { validatorParamsId } from 'src/middlewares/validator-params-id.middleware';
import { recipeController } from 'src/controllers/recipe.controller';

const recipeRouter = Router();

recipeRouter
	.get('/', errorHandler(recipeController.findAll))
	.get('/:id', validatorParamsId(), errorHandler(recipeController.getById))
	.post('/', errorHandler(recipeController.create))
	.put('/', errorHandler(recipeController.update))
	.delete('/:id', validatorParamsId(), errorHandler(recipeController.delete));

export default recipeRouter;
