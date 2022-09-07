import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from 'src/types/category/category.interface';

export interface ICategoryState {
	categories: ICategory[];
}

const initialState: ICategoryState = {
	categories: [],
};

export const CategorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: {},
});

export const categoryReducer = CategorySlice.reducer;
