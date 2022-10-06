import * as Yup from 'yup';

export const CreateCategorySchema = Yup.object().shape({
	name: Yup.string().required('Required'),
});

export const EditCategorySchema = Yup.object().shape({
	name: Yup.string().required('Required'),
});

export const CreateRecipeSchema = Yup.object().shape({
	title: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
});

export const EditRecipeSchema = Yup.object().shape({
	title: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
});

export const CreatePostSchema = Yup.object().shape({
	title: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	body: Yup.string().required('Required'),
});

export const EditPostSchema = Yup.object().shape({
	title: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	body: Yup.string().required('Required'),
});
