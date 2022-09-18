import { Navigate, Route, Routes } from 'react-router-dom';
import Home from 'src/containers/Home';
import Post from 'src/containers/Post';
import Posts from 'src/containers/Posts';
import Recipe from 'src/containers/Recipe';
import Recipes from 'src/containers/Recipes';
import BreadcrumbsWrapper from 'src/hoc/BreadcrumbsWrapper';

export const CustomRouter = () => {
	return (
		<Routes>
			<Route path="/">
				<Route path="/" element={<Home />} />
				<Route path="recipes" element={<Recipes />} />
				<Route path="posts" element={<Posts />} />
				<Route path="category/:categoryId">
					<Route
						path="recipe"
						element={
							<BreadcrumbsWrapper>
								<Recipes />
							</BreadcrumbsWrapper>
						}
					/>
					<Route
						path="recipe/:recipeId"
						element={
							<BreadcrumbsWrapper>
								<Recipe />
							</BreadcrumbsWrapper>
						}
					/>
					<Route
						path="post"
						element={
							<BreadcrumbsWrapper>
								<Posts />
							</BreadcrumbsWrapper>
						}
					/>
					<Route
						path="post/:postId"
						element={
							<BreadcrumbsWrapper>
								<Post />
							</BreadcrumbsWrapper>
						}
					/>
				</Route>
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};
