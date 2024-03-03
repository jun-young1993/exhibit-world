import { Sidebar } from 'flowbite-react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useState } from "react";
import {MenuComponent, MenuItem} from 'types/menu-component';
import {useRecoilCallback, useRecoilState} from "recoil";
import {currentMenuAtom, menuAllAtom} from "../../store/recoil/menu.recoil";



export interface SideMenuProps {
    hideTopButton ?: boolean
}


export default function SideMenu(props: SideMenuProps) {
    const [menus] = useRecoilState<MenuComponent[]>(menuAllAtom);
    const [ , setCurrentMenu ] = useRecoilState<MenuComponent>(currentMenuAtom);
    const [isMenu, setIsMenu] = useState<boolean>(true);

    const handleHideMenuClick = () => {
        setIsMenu(!isMenu);
    }

    const createItem = (item: MenuComponent) => {
        return <Sidebar.Item
            icon={item.icon}
        >
            {item.name}
        </Sidebar.Item>
    }


    const createItemWrap = (item: MenuComponent,index: number) => {


        return (
            <div
                key={`${item.name}-${index}`}
            >
                {item.top}
            <div
                key={`${item.name}-${index}`}
                onClick={() => {
                    setCurrentMenu(item);
                }}>
                {createItem(item)}
            </div>
                {item.bottom}
            </div>
        )
    }
 
    return (
        <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            collapsed={isMenu}
        >
            <Sidebar.Items>
                {props.hideTopButton
                ? <></>
                :<Sidebar.ItemGroup>
                    <Sidebar.Item
                        icon={isMenu ? MdKeyboardDoubleArrowRight : MdKeyboardDoubleArrowLeft}
                        onClick={handleHideMenuClick}
                    >
                    </Sidebar.Item>
                </Sidebar.ItemGroup>                
                }
                <Sidebar.ItemGroup>
                    {menus.map((item,index) => {
                        return createItemWrap(item,index);
                    })}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
