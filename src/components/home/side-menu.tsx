import { Sidebar } from 'flowbite-react';
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiShoppingBag,
    HiTable,
    HiUser,
} from 'react-icons/hi';
import { MdRebaseEdit, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { twMerge } from 'tailwind-merge';
import {ComponentProps, FC, useState} from "react";
import { MenuItem, SideMenuType } from 'types/menu-component';



export interface SideMenuProps {
    onClick : (menu: string) => void,
    menuItems: MenuItem[][]
    hideTopButton ?: boolean
    
}


export default function SideMenu(props: SideMenuProps) {
    const menuItems = props.menuItems;
    const [isMenu, setIsMenu] = useState<boolean>(true);

    const handleHideMenuClick = () => {
        setIsMenu(!isMenu);
    }

    const createItem = (item: MenuItem) => {
        return <Sidebar.Item
            icon={item.icon}
        >
            {item.name}
        </Sidebar.Item>
    }

    const menuNames = new Set<string>();
    const createItemWrap = (item: MenuItem,index: number) => {
        if(menuNames.has(item.name)){
            throw new Error(`Duplicate menu item name found: ${item.name}`);
        }
        menuNames.add(item.name);

        return (
            <>
                {item.top}
            <div
                key={`${item.name}-${index}`}
                onClick={() => {
                    if(item?.onClick){
                        item.onClick();
                    }else{
                        props.onClick(item.name);
                    }

                }}
            >{createItem(item)}</div>
                {item.bottom}
            </>
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
                    {menuItems.map((menuItem, index) => {
                            return (
                                <Sidebar.ItemGroup
                                    key={`${index}`}
                                >
                                    {menuItem.map((item,index) => {
                                        if(item.children){
                                            return (
                                                <Sidebar.Collapse
                                                    key={`${item.name}-${index}`}
                                                    icon={item.icon}
                                                    label={item.name}
                                                    renderChevronIcon={(theme, open) => {
                                                        const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
            
                                                        return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                                                    }}
                                                >
                                                    {item.children.map((childrenItem, index) => {
                                                        return <>
                                                            {createItemWrap(childrenItem,index)}
                                                        </>;
                                                    })}
                                                        
                                                    
                                                </Sidebar.Collapse>
                                            )
                                        }
                                        return createItemWrap(item,index);
                                    })}
                                </Sidebar.ItemGroup>
                            )
                    })}
            </Sidebar.Items>
        </Sidebar>
    );
}
