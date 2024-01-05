import ExhibitCanvas from "./components/ExhibitCanvas";
import {RecoilRoot, useRecoilValue} from 'recoil';
import { MenuType, menuAtom } from "./store/recoil/menu.recoil";
import Home from "./components/home/home";



export default function App() {
    const menu = useRecoilValue(menuAtom);
    return (
        <>
        {menu == MenuType.EDIT
            ? <ExhibitCanvas />
            : <Home />
        }
        </>
            
    )
}
