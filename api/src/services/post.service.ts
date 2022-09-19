import { postModel } from 'src/models/post.model';
import { IQueryPostFindMany } from 'src/types/post/query-post-find-many.interface';
import { IQueryPostFindOne } from 'src/types/post/query-post-find-one.interface';
import { IPost, IPostCreate, IPostUpdate } from 'src/types/post/post.interface';

export class PostService {
	find(query: IQueryPostFindMany = {}): Promise<IPost[]> {
		return postModel.find(query);
	}

	findByCategoryId(id: string) {
		return postModel.findByCategoryId(id);
	}

	findOne(query: IQueryPostFindOne): Promise<IPost> {
		return postModel.findOne(query);
	}

	create(dto: IPostCreate): Promise<IPost> {
		return postModel.create(dto);
	}

	update(id: string, dto: IPostUpdate): Promise<IPost> {
		return postModel.update(id, dto);
	}

	delete(id: string): Promise<IPost> {
		return postModel.delete(id);
	}

	// todo: delete type
	deleteMany(posts: IPost[]) {
		const ids: string[] = posts.map(el => el._id);
		return postModel.deleteMany(ids);
	}
}

export const postService = new PostService();
