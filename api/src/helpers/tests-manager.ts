import { ICategory } from 'src/types/category/category.interface';
import appManager from './app-manager';

class TestsManager {
  private _category: ICategory;
  private _subCategory: ICategory;
  private readonly _defaultRootParentId: string;

  constructor(private readonly _appManager: typeof appManager) {
    this._defaultRootParentId = '6308af066754b3d191459c7f';
    // todo: appManager
  }

  // createCategry

  public get category(): ICategory {
    return this._category;
  }
  public set category(value: ICategory) {
    this._category = value;
  }

  public get subCategory(): ICategory {
    return this._subCategory;
  }
  public set subCategory(value: ICategory) {
    this._subCategory = value;
  }

  public get defaultRootParentId(): string | null {
    return this._defaultRootParentId;
  }
}

const testsManager = new TestsManager(appManager);

export default testsManager;
