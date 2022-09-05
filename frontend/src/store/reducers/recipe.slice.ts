import { createSlice } from '@reduxjs/toolkit';

interface IRecipeState {}

const initialState: IRecipeState = {};

export const RecipeSlice = createSlice({
	name: 'recipe',
	initialState,
	reducers: {},
	extraReducers: {},
});

export const recipeReducer = RecipeSlice.reducer;
