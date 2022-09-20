import { RootState } from 'src/store';
import { ResourceType } from 'src/types/resource.type';
import { IAppState } from 'src/store/reducers/app.slice';

export const selectCategories = (state: RootState): IAppState => {
	return state.appReducer;
};

export const selectCategoryId = (state: RootState): string | null => {
	return state.appReducer.categoryId;
};

export const selectResourceType = (state: RootState): ResourceType => {
	return state.appReducer.resourceType;
};
