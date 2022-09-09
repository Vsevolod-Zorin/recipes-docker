import { createSlice } from '@reduxjs/toolkit';
import { ICell } from 'src/helpers/treeBuilder';
import { ICategory } from 'src/types/category/category.interface';

export interface ICategoryWrapper {
	categoriesList: ICategory[];
	cellsList: ICell[];
}

export interface ICategoryState {
	selectedCell: ICell | null;
}

const initialState: ICategoryState = {
	selectedCell: null,
};

export const CategorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		// setSelectedCell(state, action: PayloadAction<ICell | null>) {
		// 	state.selectedCell = action.payload;
		// },
	},
	extraReducers: {},
});

// export const categoryActions = CategorySlice.actions;
export const categoryReducer = CategorySlice.reducer;
