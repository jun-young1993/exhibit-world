
import {RecoilRoot, useRecoilValue} from 'recoil';
import { MenuType, menuAtom } from "./store/recoil/menu.recoil";

import Home from "./components/home/home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Exhibit from "./components/exhibit";
import { CookiesProvider } from 'react-cookie';



export default function App() {
    return (
        <>

            <Router>
                <Routes>
                    <Route path={"/"} element={<Home />}/>
                    <Route path={"/exhibit/:uuid"} element={<Exhibit />}/>
                </Routes>
            </Router>

        </>
            
    )
}
