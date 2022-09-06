import { Navigate, Route, Routes } from 'react-router-dom';
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
				{/* <Route path="/" element={<Home />} /> */}
				<Route path={routersPaths.category}>
					{/* <Route path={routersPaths.category} element={<Categories />} />
					<Route path="editor" element={<CategoryEditor />} />
					<Route path="editor/:id" element={<CategoryEditor />} /> */}
				</Route>
				<Route path={routersPaths.recipe}>
					<Route path={routersPaths.recipes} element={<Recipes />} />
					{/* <Route path="editor" element={<RecipeEditor />} />
					<Route path="editor/:id" element={<RecipeEditor />} /> */}
				</Route>
				<Route path="post">
					<Route path={routersPaths.posts} element={<Posts />} />
					{/* <Route path="editor" element={<PostEditor />} /> */}
					{/* <Route path="editor/:id" element={<PostEditor />} /> */}
				</Route>
			</Route>
			<Route path="*" element={<Navigate to="/category" replace />} />
		</Routes>
	);
};
