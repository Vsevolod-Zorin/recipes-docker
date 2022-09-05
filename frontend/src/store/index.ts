import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { categoryReducer } from 'src/store/reducers/category.slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { categoryApi } from 'src/services/category.api';

const rootReducer = combineReducers({
	categoryReducer,
	[categoryApi.reducerPath]: categoryApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(categoryApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
