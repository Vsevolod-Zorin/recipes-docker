import { ResourceType } from 'src/types/resource.type';

export const checkTypeFromUrl = (url: string): ResourceType | null => {
	if (url.includes('/recipe')) {
		return 'recipe';
	}

	if (url.includes('/post')) {
		return 'post';
	}

	return null;
};
