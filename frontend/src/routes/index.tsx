import { Route, Routes } from 'react-router-dom';
import Home from 'src/containers/Home';

// todo: fetch categories
export const CustomRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>;
		</Routes>
	);
};
