import { getModelForClass, modelOptions, Prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { IPost } from 'src/types/post/post.interface';
import { Category } from './Category';

@modelOptions({
	options: { customName: 'post' },
	schemaOptions: { versionKey: false, timestamps: true },
})
export class PostSchema implements IPost {
	_id: string;

	@Prop({ required: true, trim: true })
	public title: string;

	@Prop({ required: true, trim: true })
	public description: string;

	@Prop({ required: true, trim: true })
	public body: string;

	@Prop({ index: true, ref: Category, type: mongoose.Types.ObjectId })
	public categoryId: Ref<typeof Category, string>;

	@Prop()
	createdAt: Date;

	@Prop()
	updatedAt: Date;
}

export const Post: ReturnModelType<typeof PostSchema> = getModelForClass(PostSchema);
