import { atom } from "recoil";

export enum MenuType {
	HOME = 'home',
	EDIT = 'edit',
}

export const menuAtom = atom<MenuType>({
	key: 'TodoList',
	default: MenuType.HOME,
});