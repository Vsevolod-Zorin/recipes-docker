import { UpdateWriteOpResult } from 'mongoose';
import { Post } from 'src/schema/Post';
import { IPost, IPostCreate, IPostUpdate } from 'src/types/post/post.interface';
import { IQueryPostFindMany } from 'src/types/post/query-post-find-many.interface';
import { IQueryPostFindOne } from 'src/types/post/query-post-find-one.interface';

class PostModel {
	find(query: IQueryPostFindMany): Promise<IPost[]> {
		return Post.find(query).exec();
	}

	findOne(query: IQueryPostFindOne): Promise<IPost> {
		return Post.findOne(query).exec();
	}

	findByCategoryId(id: string) {
		return Post.find({ categoryId: id }).exec();
	}

	paginationByCategoryId(categoryId: string, skip: number, limit: number): Promise<IPost[]> {
		return Post.find({ categoryId }).skip(skip).limit(limit).exec();
	}

	create(dto: IPostCreate): Promise<IPost> {
		return new Post(dto).save();
	}

	update(id: string, dto: IPostUpdate): Promise<IPost> {
		return Post.findOneAndUpdate({ _id: id }, { $set: { ...dto } }, { new: true }).exec();
	}

	updateMany(ids: string[], update: IPostUpdate): Promise<UpdateWriteOpResult> {
		return Post.updateMany({ id: { $in: ids } }, update).exec();
	}

	// todo type
	deleteMany(ids: string[]) {
		return Post.deleteMany({ id: { $in: ids } });
	}

	delete(id: string): Promise<IPost> {
		return Post.findByIdAndDelete(id).exec();
	}
}

export const postModel = new PostModel();
