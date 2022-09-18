import React from 'react';
import Breadcrumbs from 'src/components/BreadCrumbs';

interface IBreadcrumbsWrapper {
	children: React.ReactNode;
}

const BreadcrumbsWrapper: React.FC<IBreadcrumbsWrapper> = ({ children }) => {
	return (
		<>
			<Breadcrumbs />
			{children}
		</>
	);
};

export default BreadcrumbsWrapper;
