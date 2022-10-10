import { getModelForClass, modelOptions, Prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import { Category } from './Category';

@modelOptions({
	options: { customName: 'recipe' },
	schemaOptions: { versionKey: false, timestamps: true },
})
export class RecipeSchema implements IRecipe {
	_id: string;

	@Prop({ required: true, trim: true })
	public title: string;

	@Prop({ required: true, trim: true })
	public description: string;

	@Prop({ index: true, ref: Category, type: mongoose.Types.ObjectId })
	public categoryId: Ref<typeof Category, string>;

	@Prop()
	createdAt: Date;

	@Prop()
	updatedAt: Date;
}

export const Recipe: ReturnModelType<typeof RecipeSchema> = getModelForClass(RecipeSchema);
