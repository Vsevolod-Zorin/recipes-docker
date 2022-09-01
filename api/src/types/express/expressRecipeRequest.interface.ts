import { Request } from 'express';
import { IRecipe } from '../recipe/recipe.interface';

export interface ExpressRecipeRequest extends Request {
	recipe: IRecipe;
}
