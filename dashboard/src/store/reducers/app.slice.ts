import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResourceType } from 'src/types/resource.type';

export interface IAppState {
	categoryId: string | null;
	resourceType: ResourceType;
}

const initialState: IAppState = {
	categoryId: null,
	resourceType: 'recipe',
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
	},
	extraReducers: {},
});

export const appActions = AppSlice.actions;
export const appReducer = AppSlice.reducer;
