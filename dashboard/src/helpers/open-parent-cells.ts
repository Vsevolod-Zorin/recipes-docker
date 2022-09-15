import { ICell } from './treeBuilder';

export const openParentCells = (id: string, cellsList: ICell[]) => {
	const currentCell = cellsList.find(el => el._currentCategory?._id === id);
	let cursor: ICell | null | undefined = currentCell?._prev;

	while (cursor) {
		cursor._isOpen = true;
		cursor = cursor._prev;
	}
};
