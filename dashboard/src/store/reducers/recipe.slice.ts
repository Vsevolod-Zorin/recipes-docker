import { createSlice } from '@reduxjs/toolkit';
export interface IRecipeState {}

const initialState: IRecipeState = {};

export const RecipeSlice = createSlice({
	name: 'recipe',
	initialState,
	reducers: {},
	extraReducers: {},
});

export const recipeReducer = RecipeSlice.reducer;
