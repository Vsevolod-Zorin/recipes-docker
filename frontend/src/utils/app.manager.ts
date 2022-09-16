import { ResourceType } from 'src/types/category/resource.type';

class AppManager {
	private _resourceType: ResourceType = 'recipe';
	private _selectedCategoryId: string = '';

	get resourceType(): ResourceType {
		return this._resourceType;
	}

	set resourceType(value: ResourceType) {
		this._resourceType = value;
	}

	get selectCategoryId(): string {
		return this._selectedCategoryId;
	}

	set selectCategoryId(value: string) {
		this._selectedCategoryId = value;
	}

	resetSelectedCategory() {
		this._selectedCategoryId = '';
	}
}

const appManager = new AppManager();
export default appManager;
