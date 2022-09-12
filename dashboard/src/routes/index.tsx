import { Navigate, Route, Routes } from 'react-router-dom';
import Home from 'src/containers/Home';
import Posts from 'src/containers/Posts';
import Recipes from 'src/containers/Recipes';

export const routersPaths = {
	category: 'category',
	categories: 'categories',
	recipe: 'recipe',
	recipes: 'recipes',
	post: 'post',
	posts: 'posts',
};

export const CustomRouter = () => {
	return (
		<Routes>
			<Route path="/">
				<Route path="/" element={<Home />} />
				<Route path="category/:categoryId">
					<Route path="recipe" element={<Recipes />} />
					<Route path="post" element={<Posts />} />
				</Route>
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};
