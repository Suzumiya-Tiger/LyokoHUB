import { menuType } from "./menu";
export interface roleType {
  id?: number;
  name?: string;
  type?: number;
  createAt?: string;
  updateAt?: string;
  intro?: string;
  size?: number;
  offset?: number;
  menuList?: menuType[];
}
