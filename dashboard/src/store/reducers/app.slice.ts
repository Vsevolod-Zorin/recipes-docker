import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecipe } from 'src/types/recipe/recipe.interface';
import { ResourceType } from 'src/types/resource.type';

export interface IAppState {
	categoryId: string | null;
	resourceType: ResourceType;

	postsSkip: number;
	postsLimit: number;
}

const initialState: IAppState = {
	categoryId: null,
	resourceType: 'recipe',
	postsSkip: 0,
	postsLimit: 10,
};

export const AppSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setSelectedCategoryId(state, action: PayloadAction<string | null>) {
			state.categoryId = action.payload;
		},
		setResourceType(state, action: PayloadAction<ResourceType>) {
			state.resourceType = action.payload;
		},
		setPostsSkip(state, action: PayloadAction<number>) {
			state.postsSkip = action.payload;
		},
		setPostsLimit(state, action: PayloadAction<number>) {
			state.postsLimit = action.payload;
		},
	},
	extraReducers: {},
});

export const appActions = AppSlice.actions;
export const appReducer = AppSlice.reducer;
