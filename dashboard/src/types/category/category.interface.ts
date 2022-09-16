export interface ICategory {
	_id: string;
	name: string;
	parentId: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICategoryCreate {
	name: string;
	parentId: string | null;
}
export interface ICategoryDelete {
	id: string;
	name: string;
	parentId: string | null;
}

export interface ICategoryUpdate {
	id: string;
	name: string;
	parentId: string | null;
}
