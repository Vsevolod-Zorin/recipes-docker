export interface ICategory {
  _id: string;
  name: string;
  parentId: string | null;
}

export interface ICategoryCreate {
  name: string;
  parentId: string | null;
}

export interface ICategoryUpdate {
  id: string;
  name?: string;
  parentId?: string | null;
}
