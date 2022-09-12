import { ICategory } from 'src/types/category/category.interface';

export interface ICell {
	_currentCategory: ICategory | null;
	_prev: ICell | null;
	_next: ICell[];
	initParent?: (list: ICell[]) => void;
	initBreadcrumbs?: () => void;
}

class Cell implements ICell {
	public _currentCategory: ICategory | null = null;
	public _prev: ICell | null = null;
	public _next: ICell[] = [];
	public _breadcrumbs: string[] = [];

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

	initBreadcrumbs() {
		let parent: ICell | null = this._prev;
		do {
			if (parent) {
				this._breadcrumbs.push(parent._currentCategory!.name);
				parent = parent._prev;
			}
		} while (parent);
		this._breadcrumbs = this._breadcrumbs.reverse();
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
			el.initBreadcrumbs!();
			if (el._next.length > 0) {
				this.rec(el._next);
			}
		});
	};

	recInitBreadcrumbs = (cellsList: ICell[]) => {
		cellsList.forEach((el, index, arr) => {
			el._next = this.findManyByParentId(el._currentCategory!._id);
			// el.initParent!(this.cellsList);
			el.initBreadcrumbs!();
			if (el._next.length > 0) {
				this.recInitBreadcrumbs(el._next);
			}
		});
	};

	init() {
		this.sortedCellsList = this.findManyByParentId(null);

		this.cellsList.forEach((el, index, arr) => {
			el._next = this.findManyByParentId(el._currentCategory!._id);
			el.initParent!(this.cellsList);
			el.initBreadcrumbs!();

			this.rec(this.cellsList);
		});

		console.log('--- sortedCellsList ', { sortedCellsList: this.sortedCellsList });

		this.recInitBreadcrumbs(this.sortedCellsList);
	}

	getBreadcrumbs(cell: ICell) {
		const list: ICell[] = [];
		const cursor: ICell = cell;
	}
}

export const treeBuilder = (categories: ICategory[]) => {};
