import { RootState } from 'src/store';
import { ICategoryState } from '../reducers/category.slice';

export const selectCategories = (state: RootState): ICategoryState => {
	return state.categoryReducer;
};
