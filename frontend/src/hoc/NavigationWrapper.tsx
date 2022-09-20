import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { useAppDispatch } from 'src/hooks/redux';
import { appActions } from 'src/store/reducers/app.slice';
import { checkTypeFromUrl } from 'src/utils/checkTypeFromUrl';

interface INavigationWrapper {
	children: React.ReactNode;
}

const NavigationWrapper: React.FC<INavigationWrapper> = ({ children }) => {
	const { categoryId } = useParams();
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const type = checkTypeFromUrl(location.pathname);
		if (type) {
			dispatch(appActions.setResourceType(type));
		}
	}, [location, dispatch]);

	useEffect(() => {
		if (categoryId) {
			dispatch(appActions.setSelectedCategoryId(categoryId));
		}
	}, [categoryId, dispatch]);
	return <>{children}</>;
};

export default NavigationWrapper;
