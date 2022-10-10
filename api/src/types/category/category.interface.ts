import { EntityStatusEnum } from '../entity-status.enum';

export interface ICategory {
	_id: string;
	name: string;
	parentId: string | null;
	createdAt?: Date;
	updatedAt?: Date;
	status: EntityStatusEnum;
}

export interface ICategoryCreate {
	name: string;
	parentId?: string;
}

export interface ICategoryUpdate {
	id: string;
	name?: string;
	parentId?: string;
}
export interface ICategoryUpdateMany {
	name?: string;
	parentId?: string | null;
}
