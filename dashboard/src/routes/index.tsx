import { Navigate, Route, Routes } from 'react-router-dom';
import Categories from 'src/containers/Categories';
import Home from 'src/containers/Home';
import Post from 'src/containers/Post';
import Posts from 'src/containers/Posts';
import Recipe from 'src/containers/Recipe';
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
				<Route path={routersPaths.categories} element={<Categories />} />
				<Route path={routersPaths.recipes} element={<Recipes />} />
				<Route path={routersPaths.posts} element={<Posts />} />
				<Route path={routersPaths.categories + '/editor/:id'} element={<Home />} />
				<Route path={routersPaths.recipes + '/editor/:id'} element={<Home />} />
				<Route path={routersPaths.posts + '/editor/:id'} element={<Home />} />
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};
