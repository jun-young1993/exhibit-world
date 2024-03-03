import {MenuComponent} from "../../../types/menu-component";
import {HiArrowSmRight, HiChartPie, HiLibrary, HiShoppingBag} from "react-icons/hi";
import {BiSolidObjectsHorizontalLeft} from "react-icons/bi";
import ObjectList from "../../../components/home/object-list";
import ExhibitList from "../../../components/home/exhibit-list";
import Login from "../../../components/home/login";
export const loginMenu: MenuComponent = {
    name: 'Sign In',
    icon: HiArrowSmRight,
    component: <Login />
};
export const defaultMenuItem: MenuComponent[] =  [{
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
},loginMenu];



