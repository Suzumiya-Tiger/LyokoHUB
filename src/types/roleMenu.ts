import { menuType } from "./menu";

export interface roleMenuType {
  id?: number;
  name: string;
  intro: string;
  roleId?: number;
  menuIds?: Array<number>;
  menu: Array<menuType>;
}
