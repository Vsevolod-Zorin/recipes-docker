import { UpdateWriteOpResult } from 'mongoose';
import { Post } from 'src/schema/Post';
import { IPost, IPostCreate, IPostUpdate } from 'src/types/post/post.interface';
import { IQueryPostFindMany } from 'src/types/post/query-post-find-many.interface';
import { IQueryPostFindOne } from 'src/types/post/query-post-find-one.interface';
import cacheManager from 'src/utils/cache.manager';

class PostModel {
	find(query: IQueryPostFindMany): Promise<IPost[]> {
		return cacheManager.post.find<IPost[]>(query, () => Post.find(query).exec());
	}

	findOne(query: IQueryPostFindOne): Promise<IPost> {
		return cacheManager.post.findOne<IPost>(query, () => Post.findOne(query).exec());
	}

	findByCategoryId(categoryId: string): Promise<IPost[]> {
		return this.find({ categoryId: [categoryId] });
	}

	paginationByCategoryId(categoryId: string, skip: number, limit: number): Promise<IPost[]> {
		return cacheManager.post.find<IPost[]>({ categoryId, skip, limit }, () =>
			Post.find({ categoryId }).skip(skip).limit(limit).exec()
		);
	}

	create(dto: IPostCreate): Promise<IPost> {
		// todo: await? new event?
		cacheManager.flushAll();
		return new Post(dto).save();
	}

	update(id: string, dto: IPostUpdate): Promise<IPost> {
		cacheManager.flushAll();
		return Post.findOneAndUpdate({ _id: id }, { $set: { ...dto } }, { new: true }).exec();
	}

	updateMany(ids: string[], update: IPostUpdate): Promise<UpdateWriteOpResult> {
		cacheManager.flushAll();
		return Post.updateMany({ id: { $in: ids } }, update).exec();
	}

	deleteMany(ids: string[]) {
		cacheManager.flushAll();
		return Post.deleteMany({ id: { $in: ids } });
	}

	deleteManyByCategoryId(categoryId: string) {
		cacheManager.flushAll();
		return Post.deleteMany({ categoryId });
	}

	delete(id: string): Promise<IPost> {
		cacheManager.flushAll();
		return Post.findByIdAndDelete(id).exec();
	}
}

export const postModel = new PostModel();
