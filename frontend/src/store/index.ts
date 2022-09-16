import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createLogger } from 'redux-logger';
import { categoryReducer } from 'src/store/reducers/category.slice';
import { categoryApi } from 'src/services/category.api';
import { config, Envs } from 'src/config';
import { recipeApi } from 'src/services/recipe.api';

const rootReducer = combineReducers({
	categoryReducer,
	[categoryApi.reducerPath]: categoryApi.reducer,
	[recipeApi.reducerPath]: recipeApi.reducer,
});

const logger = createLogger({});

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		config.getEnv() === Envs.production
			? getDefaultMiddleware()
			: getDefaultMiddleware().concat(logger),

	devTools: config.getEnv() !== Envs.production,
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
