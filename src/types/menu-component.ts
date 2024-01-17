
import { ComponentProps, FC, ReactNode } from "react"
export interface MenuItem {
	name: string,
	icon?: FC<ComponentProps<'svg'>>
	children?: MenuItem[]
    }
export interface MenuComponent extends MenuItem {
	component?: ReactNode | JSX.Element
	children?: MenuComponent[]
    }
    
