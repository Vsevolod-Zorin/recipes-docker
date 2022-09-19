import { StatusCodes } from 'http-status-codes';
import { postService } from 'src/services/post.service';
import { BackendError } from 'src/shared/backend.error';
import { BackendMessage } from 'src/shared/backend.messages';
import { IPost } from 'src/types/post/post.interface';

export const validatePostById = async (id: string): Promise<IPost> => {
	const post = await postService.findOne({ _id: id });

	if (!post) {
		throw new BackendError(StatusCodes.NOT_FOUND, BackendMessage.NOT_FOUND);
	}
	return post;
};
