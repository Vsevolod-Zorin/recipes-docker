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
}

export class TreeManager {
	cellsList: ICell[] = [];
	sortedCellsList: ICell[] = [];

	constructor(readonly sourceCategoryList: ICategory[]) {
		this.cellsList = this.sourceCategoryList.map(el => this.wrapCategoryToCell(el));
	}

	getByParrentId(parrentId: string | null): ICategory[] {
		return this.sourceCategoryList.filter(el => el.parentId === parrentId);
	}

	findManyByParentId(id: string | null): ICell[] {
		return this.cellsList.filter(cell => cell._currentCategory?.parentId === id);
	}

	wrapCategoryToCell(category: ICategory) {
		const cell = new Cell();
		cell._currentCategory = category;
		return cell;
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

		this.cellsList.forEach((el, index, arr) => {
			el._next = this.findManyByParentId(el._currentCategory!._id);
			el.initParent!(this.cellsList);
			this.rec(this.cellsList);
		});
	}

	getBreadcrumbs(cell: ICell) {
		const list: ICell[] = [];
		const cursor: ICell = cell;
	}
}

export const treeBuilder = (categories: ICategory[]) => {};
