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

export interface SideMenuProps {
    onClick : (menu: string) => void,
    menuItem: MenuItem[]
}

export interface MenuItem {
    name: string,
    icon?: FC<ComponentProps<'svg'>>
    children?: MenuItem[]
}
export default function SideMenu(props: SideMenuProps) {
    const menuItem = props.menuItem;
    const [isMenu, setIsMenu] = useState<boolean>(true);
    const handleMenuClick  = () => {
        console.log(event);
        // props.onClick(menu);
    }
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

    return (
        <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            collapsed={isMenu}
        >
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        icon={isMenu ? MdKeyboardDoubleArrowRight : MdKeyboardDoubleArrowLeft}
                        onClick={handleHideMenuClick}
                    >
                    </Sidebar.Item>
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
                                        return <div
                                            key={`${item.name}-${index}`}
                                            onClick={() => {
                                                props.onClick(childrenItem.name);}
                                            }
                                        >{createItem(childrenItem)}</div>;
                                    })}
                                </Sidebar.Collapse>
                            )
                        }
                        return <div
                            key={`${item.name}-${index}`}
                            onClick={() => {
                                props.onClick(item.name);}
                            }
                        >{createItem(item)}</div>;
                    })}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
