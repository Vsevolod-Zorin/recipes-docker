import { Request } from 'express';
import { IPost } from '../post/post.interface';

export interface ExpressPostRequest extends Request {
	post: IPost;
}
