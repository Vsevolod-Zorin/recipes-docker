import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { postService } from 'src/services/post.service';
import { validateCategoryById } from 'src/shared/validation/category/category-get-by-id.validarion';
import { ExpressPostRequest } from 'src/types/express/expressPostRequest.interface';
import { IPost } from 'src/types/post/post.interface';
import cacheManager, { CacheResourceType } from 'src/utils/cache.manager';
import eventsManager from 'src/utils/evens.manager';

class PostController {
	// async findAll(req: Request, res: Response) {
	// 	const posts = await cacheManager.getOrFetch<IPost[]>(`${CacheResourceType.POST}`, () =>
	// 		postService.find()
	// 	);
	// 	res.status(StatusCodes.OK).json(posts);
	// }

	async getById(req: ExpressPostRequest, res: Response) {
		const { post } = req;
		res.status(StatusCodes.OK).json(post);
	}

	async getByCategoryId(req: ExpressPostRequest, res: Response) {
		const { id } = req.params;

		const posts = await cacheManager.getOrFetch<IPost[]>(
			cacheManager.generateKey(CacheResourceType.CATEGORY, id as string, CacheResourceType.POST),
			() => postService.findByCategoryId(id as string)
		);
		res.status(StatusCodes.OK).json(posts);
	}

	// todo: check method and create cache
	async paginationByCategoryId(req: Request, res: Response) {
		const { categoryId, skip, limit } = req.query;

		const recipes = await postService.paginationByCategoryId(
			categoryId as string,
			Number(skip),
			Number(limit)
		);
		res.status(200).json(recipes);
	}

	async create(req: Request, res: Response) {
		const createdPost = await postService.create(req.body);
		res.status(StatusCodes.CREATED).json(createdPost);

		eventsManager.emit('SET_POST', { data: createdPost }); // with cache
	}

	async update(req: ExpressPostRequest, res: Response) {
		const { categoryId } = req.body;
		const { post } = req;

		if (categoryId) {
			await validateCategoryById(categoryId);
		}

		const updatedPost = await postService.update(post._id, req.body);
		res.status(StatusCodes.OK).json(updatedPost);

		eventsManager.emit('SET_POST', { data: updatedPost }); // with cache
	}

	async delete(req: ExpressPostRequest, res: Response) {
		const { post } = req;

		await postService.delete(post._id);
		res.status(StatusCodes.OK).send();

		eventsManager.emit('DELETE_POST', { data: post }); // with cache
	}
}

export const postController = new PostController();
