
import { ComponentProps, FC, ReactNode } from "react"
export enum SideMenuType {
	FILE = 'file'
    }
export interface MenuItem {
	name: string,
	icon?: FC<ComponentProps<'svg'>>
	children?: MenuItem[],
	top ?: ReactNode
	bottom ?: ReactNode
	onClick ?: () => void
}
export interface MenuComponent extends MenuItem {
	component?: ReactNode | JSX.Element
	children?: MenuComponent[]
    }
    
