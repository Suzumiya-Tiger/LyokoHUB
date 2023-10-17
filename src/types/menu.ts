export interface menuType {
  id?: number;
  name?: string;
  type?: number;
  createAt?: string;
  updateAt?: string;
  icon?: string;
  parentId?: string;
  url?: string;
  permission?: string;
  sort?: number;
  menuIds?: Array<number>;
  children?: Array<menuType>;
}
