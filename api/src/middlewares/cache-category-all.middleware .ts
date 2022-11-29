import { NextFunction, Response } from 'express';
import { OutgoingMessage } from 'http';
import cacheManager, { CacheResourceType } from 'src/utils/cache.manager';
import { ExpressCategoriesRequest } from 'src/types/express/expressCategoriesRequest.interface';

export function cacheCategoryAll() {
	return async function (
		req: ExpressCategoriesRequest,
		res: Response,
		next: NextFunction
	): Promise<OutgoingMessage> {
		try {
			const categories = await cacheManager.getAsync(`${CacheResourceType.CATEGORY}`);

			if (categories) {
				req.categories = categories;
			}
			// todo: res?
			next();
		} catch (e) {
			return res.status(400).json({ ...e });
		}
	};
}
