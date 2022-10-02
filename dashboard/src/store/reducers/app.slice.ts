import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResourceType } from 'src/types/resource.type';

export interface IAppState {
	categoryId: string | null;
	resourceType: ResourceType;
	recipesSkip: number;
	recipesLimit: number;
	postsSkip: number;
	postsLimit: number;
}

const initialState: IAppState = {
	categoryId: null,
	resourceType: 'recipe',
	recipesSkip: 0,
	recipesLimit: 1,
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
		setRecipesSkip(state, action: PayloadAction<number>) {
			state.recipesSkip = action.payload;
		},
		setRecipesLimit(state, action: PayloadAction<number>) {
			state.recipesLimit = action.payload;
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
