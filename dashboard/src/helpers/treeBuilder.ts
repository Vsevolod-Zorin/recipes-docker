import { ICategory } from 'src/types/category/category.interface';

export interface ICell {
	_currentCategory: ICategory | null;
	_prev: ICell | null;
	_next: ICell[];
	initParent?: (list: ICell[]) => void;
}

const initialState: ICell = {
	_currentCategory: null,
	_prev: null,
	_next: [],
};

class Cell implements ICell {
	public _currentCategory: ICategory | null = null;
	public _prev: ICell | null = null;
	public _next: ICell[] = [];

	constructor(initialState: ICell | null = null) {
		if (initialState) {
			this._currentCategory = initialState._currentCategory;
			this._prev = initialState._prev;
			this._next = initialState._next;
		}
	}

	initParent(list: ICell[]): void {
		const parent: ICell | undefined = list.find(
			el => el._currentCategory?._id === this._currentCategory?.parentId
		);
		if (parent) {
			this._prev = parent;
		}
	}

	// get currentCategory(): ICategory | null {
	// 	return this._currentCategory;
	// }
	// set currentCategory(value: ICategory) {
	// 	this._currentCategory = value;
	// }

	// get prev() {
	// 	return this._prev;
	// }
	// set prev(value: ICategory | null) {
	// 	this._prev = value;
	// }

	// get next() {
	// 	return this._next;
	// }
	// set next(value: ICategory | null) {
	// 	this._next = value;
	// }
}

interface IBranch {
	// parent: IBranch | null;
	cellsList: ICell[];
	branchesMap: Map<number, IBranch>;
	branchIndex: number;
}
class Branch implements IBranch {
	private _branchesMap: Map<number, IBranch>;
	private _cellsList: ICell[];
	private _cell: ICell;

	constructor(readonly branchIndex: number, cell: ICell) {
		this._branchesMap = new Map<number, IBranch>();
		this._cellsList = [];
		this._cell = cell;
	}

	get branchesMap() {
		return this._branchesMap;
	}
	private set branchesMap(value: Map<number, IBranch>) {
		this._branchesMap = value;
	}

	get cellsList() {
		return this._cellsList;
	}
	private set celslList(value: ICell[]) {
		this._cellsList = value;
	}
}

export class TreeManager {
	// private _sourceBranchesList: IBranch[] = [];
	private _sourceBranchesMap: Map<number, IBranch> = new Map<number, IBranch>();
	cellsList: ICell[] = [];

	constructor(readonly sourceCategoryList: ICategory[]) {
		this.cellsList = this.sourceCategoryList.map(el => this.wrapCategoryToCell(el));
	}

	sortedCellsList: ICell[] = [];
	getByParrentId(parrentId: string | null): ICategory[] {
		return this.sourceCategoryList.filter(el => el.parentId === parrentId);
	}

	get sourceBranchesMap() {
		return this._sourceBranchesMap;
	}
	private set sourceBranchesMap(value: Map<number, IBranch>) {
		this._sourceBranchesMap = value;
	}

	// addNewBranch(cell: ICell) {
	// 	const index = this._sourceBranchesMap.size;
	// 	this._sourceBranchesMap.set(index, new Branch(index, cell));
	// }

	// getPrev(cell: ICell): ICell | null {
	// 	return cell._prev;
	// }

	// getNext(cell: ICell): ICell[] {
	// 	return cell._next;
	// }

	wrapCategoryToCell(category: ICategory) {
		const cell = new Cell();
		cell._currentCategory = category;
		return cell;
	}

	findManyByParentId(id: string | null): ICell[] {
		return this.cellsList.filter(cell => cell._currentCategory?.parentId === id);
	}

	/**
	 * @description: 'cell(category) -> init cell.prev: ICell and cell.next: ICell[]'
	 */
	rec = (cellsList: ICell[]) => {
		cellsList.forEach((el, index, arr) => {
			el._next = this.findManyByParentId(el._currentCategory!._id);
			el.initParent!(this.cellsList);
			if (el._next.length > 0) {
				this.rec(el._next);
			}
		});
	};

	init() {
		this.sortedCellsList = this.findManyByParentId(null);
		console.log('--- sortedCellsList', { sortedCellsList: this.sortedCellsList });

		//
		this.cellsList.forEach((el, index, arr) => {
			el._next = this.findManyByParentId(el._currentCategory!._id);
			el.initParent!(this.cellsList);
			this.rec(this.cellsList);
		});

		// console.log('cellsList', { cellsList: this.cellsList });
		// console.log('--- sortedCellsList init', { sortedCellsList: this.sortedCellsList });
	}

	getBreadcrumbs(cell: ICell) {
		const list: ICell[] = [];
		const cursor: ICell = cell;
	}
}

export const treeBuilder = (categories: ICategory[]) => {};
