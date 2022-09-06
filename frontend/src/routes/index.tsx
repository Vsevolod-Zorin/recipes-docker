import { Navigate, Route, Routes } from 'react-router-dom';
import Home from 'src/containers/Home';
import Post from 'src/containers/Post';
import Posts from 'src/containers/Posts';
import Recipe from 'src/containers/Recipe';
import Recipes from 'src/containers/Recipes';

// todo: fetch categories
export const CustomRouter = () => {
	return (
		<Routes>
			<Route path="/">
				<Route path="/" element={<Home />} />
				<Route path="category/:categoryId">
					<Route path="recipe" element={<Recipes />} />
					<Route path="recipe/:recipeId" element={<Recipe />} />
					<Route path="post" element={<Posts />} />
					<Route path="post/:postId" element={<Post />} />
				</Route>
				<Route path="recipes" element={<Recipes />} />
				<Route path="posts" element={<Posts />} />
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};
