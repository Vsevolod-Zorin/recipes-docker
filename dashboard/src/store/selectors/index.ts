import { RootState } from 'src/store';
import { IPagination } from 'src/types/pagination.interface';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import { ResourceType } from 'src/types/resource.type';

export const selectCategoryId = (state: RootState): string | null => {
	return state.appReducer.categoryId;
};

export const selectResourceType = (state: RootState): ResourceType => {
	return state.appReducer.resourceType;
};
