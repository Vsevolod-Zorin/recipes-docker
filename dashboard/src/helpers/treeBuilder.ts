import { ICategory } from 'src/types/category/category.interface';

interface ICell {
	_currentCategory: ICategory | null;
	_prev: ICell | null;
	_next: ICell | null;
}

const initialState: ICell = {
	_currentCategory: null,
	_prev: null,
	_next: null,
};

class Cell implements ICell {
	public _currentCategory: ICategory | null = null;
	public _prev: ICell | null = null;
	public _next: ICell | null = null;

	constructor(initialState: ICell | null = null) {
		if (initialState) {
			this._currentCategory = initialState._currentCategory;
			this._prev = initialState._prev;
			this._next = initialState._next;
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
	categoriesList: ICategory[];
}
class Branch implements IBranch {
	public categoriesList: ICategory[] = [];
	// private ca;
	constructor(cell: ICell) {}
}

class TreeManager {
	private _sourceBranchesList: IBranch[] = [];
	// todo private
	public sourceCategoryList: ICategory[] = [];

	getByParrentId(parrentId: string | null): ICategory[] {
		return this.sourceCategoryList.filter(el => el.parentId === parrentId);
	}

	get sourceBranchesList() {
		return this._sourceBranchesList;
	}
	private set sourceBranchesList(value: IBranch[]) {
		this._sourceBranchesList = value;
	}

	addNewBranch(cell: ICell) {
		this._sourceBranchesList.push(new Branch(cell));
	}

	getPrev(cell: ICell): ICell | null {
		return cell._prev;
	}

	getNext(cell: ICell): ICell | null {
		return cell._next;
	}
	// todo check
	// getCurrentCell(){
	// 	const cell = new Cell({
	// 		_currentCategory: this.,
	// 		 _next: this.next,
	// 		  _prev: this.prev
	// 		});
	// 	return cell
	// }

	getBreadcrumbs(cell: ICell) {
		const list: ICell[] = [];
		const cursor: ICell = cell;
	}
}

const tree = new Map<string, IBranch>();

export const treeBuilder = (categories: ICategory[]) => {
	categories.forEach(el => {});
};
