import { RootState } from 'src/store';
import { ResourceType } from 'src/types/resource.type';

export const selectCategoryId = (state: RootState): string | null => {
	return state.appReducer.categoryId;
};

export const selectResourceType = (state: RootState): ResourceType => {
	return state.appReducer.resourceType;
};
