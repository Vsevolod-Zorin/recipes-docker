import { getModelForClass, Prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// todo add index
class CategorySchema extends TimeStamps {
  @Prop({ required: true, trim: true })
  public name: string;

  @Prop({ trim: true, type: () => String || null })
  public parentId: string | null;
}

export const Category = getModelForClass(CategorySchema);
