import { Router } from 'express';
import { errorHandler } from 'src/shared/error-handler';
import { validatorDto } from 'src/middlewares/validator-dto.middleware';
import { validatorCategoryParamsId } from 'src/middlewares/validator-category-params-id.middleware';
import { UpdatePostDto } from 'src/shared/validation/dto/update-post-dto';
import { CreatePostDto } from 'src/shared/validation/dto/create-post-dto';
import { validatorPostParamsId } from 'src/middlewares/validator-post-params-id.middleware';
import { postController } from 'src/controllers/post.controller';

const postRouter = Router();

postRouter
	.get('/pagination', errorHandler(postController.paginationByCategoryId))
	.get('/category/:id', validatorCategoryParamsId(), errorHandler(postController.getByCategoryId))
	.get('/:id', validatorPostParamsId(), errorHandler(postController.getById))
	.post('/', validatorDto(CreatePostDto), errorHandler(postController.create))
	.put(
		'/:id',
		validatorPostParamsId(),
		validatorDto(UpdatePostDto),
		errorHandler(postController.update)
	)
	.delete('/:id', validatorPostParamsId(), errorHandler(postController.delete));

export default postRouter;
