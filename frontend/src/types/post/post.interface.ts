export interface IPost {
	_id: string;
	title: string;
	description: string;
	body: string;
	categoryId: string;
	createdAt?: Date;
	updatedAt?: Date;
}
