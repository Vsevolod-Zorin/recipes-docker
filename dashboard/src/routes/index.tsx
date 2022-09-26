import { Navigate, Route, Routes } from 'react-router-dom';
import Home from 'src/containers/Home';
import Posts from 'src/containers/Posts';
import Recipes from 'src/containers/Recipes';
import NavigationWrapper from 'src/hoc/NavigationWrapper';

export const CustomRouter = () => {
	return (
		<Routes>
			<Route path="/">
				<Route
					path="/"
					element={
						<NavigationWrapper>
							<Home />
						</NavigationWrapper>
					}
				/>
				<Route path="category/:categoryId">
					<Route
						path="recipe"
						element={
							<NavigationWrapper>
								<Recipes />
							</NavigationWrapper>
						}
					/>
					<Route
						path="post"
						element={
							<NavigationWrapper>
								<Posts />
							</NavigationWrapper>
						}
					/>
				</Route>
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};
