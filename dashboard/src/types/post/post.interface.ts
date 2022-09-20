export interface IPost {
	_id: string;
	title: string;
	description: string;
	body: string;
	categoryId: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IPostCreate {
	title: string;
	description: string;
	body: string;
	categoryId: string;
}

export interface IPostUpdate {
	id: string;
	title?: string;
	description?: string;
	body?: string;
	categoryId?: string;
}

export interface IPostDelete {
	id: string;
	title: string;
	description: string;
	body: string;
	categoryId: string;
}
