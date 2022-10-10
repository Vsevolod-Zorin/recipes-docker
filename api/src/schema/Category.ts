import { getModelForClass, modelOptions, Prop, ReturnModelType } from '@typegoose/typegoose';
import { ICategory } from 'src/types/category/category.interface';
import { EntityStatusEnum } from 'src/types/entity-status.enum';

@modelOptions({
	options: { customName: 'category' },
	schemaOptions: { versionKey: false, timestamps: true },
})
export class CategorySchema implements ICategory {
	_id: string;

	@Prop({ required: true, trim: true })
	public name: string;

	@Prop({ index: true, trim: true, type: () => String || null, default: null })
	public parentId: string | null;

	@Prop()
	createdAt: Date;

	@Prop()
	updatedAt: Date;

	// todo : add field to check del status
	@Prop({ index: true, enum: EntityStatusEnum, default: EntityStatusEnum.ACTIVE })
	status: EntityStatusEnum;
}

export const Category: ReturnModelType<typeof CategorySchema> = getModelForClass(CategorySchema);
