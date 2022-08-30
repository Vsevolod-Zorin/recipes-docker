import { getModelForClass, modelOptions, Prop, ReturnModelType } from '@typegoose/typegoose';
import { ICategory } from 'src/types/category/category.interface';

// todo add index
@modelOptions({
  options: { customName: 'category' },
  schemaOptions: { versionKey: false, timestamps: true },
})
export class CategorySchema implements ICategory {
  _id: string;

  @Prop({ required: true, trim: true })
  public name: string;

  @Prop({ trim: true, type: () => String || null })
  public parentId: string | null;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const Category: ReturnModelType<typeof CategorySchema> = getModelForClass(CategorySchema);
