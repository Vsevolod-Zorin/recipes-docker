import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { postService } from 'src/services/post.service';
import { validateCategoryById } from 'src/shared/validation/category/category-get-by-id.validarion';
import { ExpressPostRequest } from 'src/types/express/expressPostRequest.interface';

class PostController {
	async findAll(req: Request, res: Response) {
		const posts = await postService.find();
		res.status(StatusCodes.OK).json(posts);
	}

	async getById(req: ExpressPostRequest, res: Response) {
		const { post } = req;
		res.status(StatusCodes.OK).json(post);
	}
	async getByCategoryId(req: ExpressPostRequest, res: Response) {
		const { id } = req.params;
		await validateCategoryById(id as string);
		const posts = await postService.findByCategoryId(id as string);
		res.status(StatusCodes.OK).json(posts);
	}

	async create(req: Request, res: Response) {
		const createdPost = await postService.create(req.body);
		res.status(StatusCodes.CREATED).json(createdPost);
	}

	async update(req: ExpressPostRequest, res: Response) {
		const { categoryId } = req.body;
		const { post } = req;

		if (categoryId) {
			await validateCategoryById(categoryId);
		}
		const updatedPost = await postService.update(post._id, req.body);
		res.status(StatusCodes.OK).json(updatedPost);
	}

	async delete(req: ExpressPostRequest, res: Response) {
		const { post } = req;
		await postService.delete(post._id);
		res.status(StatusCodes.OK).send();
	}
}

export const postController = new PostController();
