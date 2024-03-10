import SideMenu from "./side-menu";
import { ReactNode, useEffect, useState } from "react";
import {HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiLibrary , HiUser} from "react-icons/hi";
import {MdRebaseEdit} from "react-icons/md";
import { BiSolidObjectsHorizontalLeft } from "react-icons/bi";

import ExhibitCanvas from "../ExhibitCanvas";
import ObjectList from "./object-list";
import Login from "./login";
import { MenuComponent } from "types/menu-component";
import ExhibitList from "./exhibit-list";
import {useRecoilState, useRecoilValue} from "recoil";
import { userAtom } from "store/recoil/user.recoil";
import { FaUser } from "react-icons/fa";
import Logined from "./logined";
import {currentMenuAtom, menuAllAtom} from "../../store/recoil/menu.recoil";



const menuItem: MenuComponent[] = [{
    name: 'Dashboard',
    icon: HiChartPie,
    component: <>dashboard</>
},{
    name: 'Objects',
    icon: BiSolidObjectsHorizontalLeft,
    component: <ObjectList />,
},{
    name: 'Exhibits',
    icon: HiLibrary ,
    component: <ExhibitList />,
},{
    name: 'CollapseTest',
    icon: HiShoppingBag,
    children: [{
        name: 'test',
        component: <>test1</>
    },{
        name: 'test2',
        component: <>test2</>
    }]
},{
    name: 'Inbox',
    icon: HiInbox
},{
    name: 'Users',
    icon: HiUser
},{
    name: 'Products',
    icon: HiShoppingBag
},{
    name: 'Edit',
    icon: MdRebaseEdit,
    component: <ExhibitCanvas />
}]
export const findMenuItem = (name: string, menu: MenuComponent[][]): MenuComponent | undefined => {
    
	for (const child of menu) {
	    for(const item of child){
            if (item.name === name) {
                return item;
            }
            if (item.children) {
                const foundInChildren = findMenuItem(name, [item.children]);
                if (foundInChildren) {
                return foundInChildren;
                }
            }
	    }
    
	}
	return undefined;
    };
const loginMenuItem: MenuComponent[] = [{
        name: 'Sign In',
        icon: HiArrowSmRight,
        component: <Login />
}]
const loginedMenuItem: MenuComponent[] = [{
    name: 'User',
    icon: FaUser,
    component: <Logined />
}]

interface DashboardProps {
    defaultMenuItem ?: ReactNode | JSX.Element
}
export default function Dashboard(props: DashboardProps){
    const [ currentMenu ] = useRecoilState(currentMenuAtom);



    return (
        
        <div className={"w-full min-w-0 h-full flex"}>
            <div className={"flex-none h-full"}>
                    <SideMenu />
            </div>
            <div className={"flex-1 w-full h-full"}>
                {currentMenu.component}
            </div>
        </div>
        
    )
}


