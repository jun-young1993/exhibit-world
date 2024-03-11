import {MenuComponent} from "../../../types/menu-component";
import {HiArrowSmRight, HiChartPie, HiLibrary, HiShoppingBag} from "react-icons/hi";
import {BiSolidObjectsHorizontalLeft} from "react-icons/bi";
import ObjectList from "../../../components/home/object-list";
import ExhibitList from "../../../components/home/exhibit-list";
import Login from "../../../components/home/login";
import { FaUser } from "react-icons/fa";
import Logined from "components/home/logined";
import DashboardPannel from "components/home/dashboard/dashboard-pannel";
export const loginMenu: MenuComponent = {
    name: 'Sign In',
    icon: HiArrowSmRight,
    component: <Login />
};
export const loginedMenu: MenuComponent = {
    name: 'User',
    icon: FaUser,
    component: <Logined />
}
export const dashboardMenu: MenuComponent = {
    name: 'Dashboard',
    icon: HiChartPie,
    component: <DashboardPannel />
};

export const defaultMenuItem: MenuComponent[] =  [dashboardMenu,{
    name: 'Objects',
    icon: BiSolidObjectsHorizontalLeft,
    component: <ObjectList />,
},{
    name: 'Exhibits',
    icon: HiLibrary ,
    component: <ExhibitList />,
},loginMenu];



