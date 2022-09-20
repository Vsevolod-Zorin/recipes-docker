import { Navigate, Route, Routes } from 'react-router-dom';
import Home from 'src/containers/Home';
import Post from 'src/containers/Post';
import Posts from 'src/containers/Posts';
import Recipe from 'src/containers/Recipe';
import Recipes from 'src/containers/Recipes';
import BreadcrumbsWrapper from 'src/hoc/BreadcrumbsWrapper';
import NavigationWrapper from 'src/hoc/NavigationWrapper';

export const CustomRouter = () => {
	return (
		<Routes>
			<Route path="/">
				<Route path="/" element={<Home />} />
				<Route
					path="recipes"
					element={
						<NavigationWrapper>
							<Recipes />
						</NavigationWrapper>
					}
				/>
				<Route
					path="posts"
					element={
						<NavigationWrapper>
							<Posts />
						</NavigationWrapper>
					}
				/>
				<Route path="category/:categoryId">
					<Route
						path="recipe"
						element={
							<NavigationWrapper>
								<BreadcrumbsWrapper>
									<Recipes />
								</BreadcrumbsWrapper>
							</NavigationWrapper>
						}
					/>
					<Route
						path="recipe/:recipeId"
						element={
							<NavigationWrapper>
								<BreadcrumbsWrapper>
									<Recipe />
								</BreadcrumbsWrapper>
							</NavigationWrapper>
						}
					/>
					<Route
						path="post"
						element={
							<NavigationWrapper>
								<BreadcrumbsWrapper>
									<Posts />
								</BreadcrumbsWrapper>
							</NavigationWrapper>
						}
					/>
					<Route
						path="post/:postId"
						element={
							<NavigationWrapper>
								<BreadcrumbsWrapper>
									<Post />
								</BreadcrumbsWrapper>
							</NavigationWrapper>
						}
					/>
				</Route>
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};
