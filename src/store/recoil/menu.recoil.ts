import {atom, selector, useRecoilCallback, useRecoilState} from "recoil";
import {MenuComponent} from "../../types/menu-component";
import {HiChartPie, HiLibrary} from "react-icons/hi";
import {BiSolidObjectsHorizontalLeft} from "react-icons/bi";
import ObjectList from "../../components/home/object-list";
import ExhibitList from "../../components/home/exhibit-list";
import {defaultMenuItem, loginMenu, loginedMenu} from "./items/menu.items";

export const menuAllSelector = selector<MenuComponent[]>({
	key: "menuAllSelector",
	get: () => {
		const menuNames = new Set<string>();
		for(const {name} of defaultMenuItem){
			if(menuNames.has(name)) {
				throw new Error(`Duplicate menu item name found: ${name}`);
			}
			menuNames.add(name);
		}
		return defaultMenuItem;
	}
});

export const menuAllAtom = atom<MenuComponent[]>({
	key: "menuAllAtom",
	default: menuAllSelector
});

export const currentMenuSelector = selector<MenuComponent>({
	key: "currentMenuSelector",
	get: ({get}) => {
		const menus = get(menuAllAtom);
		return menus[0];
	}
})

export const currentMenuAtom = atom<MenuComponent>({
	key: "currentMenuAtom",
	default: currentMenuSelector
})


export const useDeleteMenuHook = function(){
	return useRecoilCallback(
		({snapshot, set}) => 
		(menuComponents : MenuComponent[]) => {
			const menus = snapshot.getLoadable(menuAllAtom).getValue();
			const deletedMenus = menus.filter((menu) => {
				return menuComponents.find((deleteMenu) => deleteMenu.name !== menu.name);
			});
			set(menuAllAtom,[...deletedMenus]);
		}
	)
}

export const usePushMenuHook = function(){
	return useRecoilCallback(
		({snapshot, set}) => 
		(menuComponents : MenuComponent[]) => {
			const menus = snapshot.getLoadable(menuAllAtom).getValue();
			
			set(menuAllAtom,[...menus, ...menuComponents]);
		}
	)
}

export const useLoginedMenu = function(){
	const {deleteMenu, pushMenu, setCurrentMenu} = useMenu();
	deleteMenu([loginMenu]);
	pushMenu([loginedMenu]);
}

export const useMenu = () => {
	const deleteMenu = useDeleteMenuHook();
	const pushMenu = usePushMenuHook();
	const [currentMenu, setCurrentMenu] = useRecoilState(currentMenuAtom);
	return {deleteMenu,pushMenu,currentMenu,setCurrentMenu,useLoginedMenu};
}
