import { ICell } from 'src/utils/treeBuilder';

export interface ICategory {
	_id: string;
	name: string;
	parentId: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICategoryWrapper {
	categoriesList: ICategory[];
	rootCellsList: ICell[];
	cellsList: ICell[];
}
