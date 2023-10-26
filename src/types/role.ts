import { menuType } from "./menu";
export interface roleType {
  menuList?: menuType[];
  id?: number;
  name?: string;
  type?: number;
  createAt?: string;
  updateAt?: string;
  intro?: string;
}
