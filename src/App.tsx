import Home from "./components/home/home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Exhibit from "./components/exhibit";
import Test from "test";

export default function App() {
    return (
        <>

            <Router>
                <Routes>
                    <Route path={"/"} element={<Home />}/>
                    <Route path={"/exhibit/:uuid"} element={<Exhibit />}/>
                    <Route path="test" element={<Test />} />
                </Routes>
            </Router>

        </>
            
    )
}
