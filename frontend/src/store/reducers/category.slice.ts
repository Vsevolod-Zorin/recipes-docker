import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICell } from 'src/utils/treeBuilder';
import { ICategory } from 'src/types/category/category.interface';

export interface ICategoryWrapper {
	categoriesList: ICategory[];
	rootCellsList: ICell[];
	cellsList: ICell[];
}

export interface ICategoryState {
	categoryId: string | null;
}

const initialState: ICategoryState = {
	categoryId: null,
};

export const CategorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setSelectedCell(state, action: PayloadAction<string | null>) {
			state.categoryId = action.payload;
		},
	},
	extraReducers: {},
});

export const categoryActions = CategorySlice.actions;
export const categoryReducer = CategorySlice.reducer;
