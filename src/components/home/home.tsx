import Login from "./login";

import Dashboard from "./dashboard";
import {TransformControlsProvider} from "../../context/transform-controls.context";


/**
 * link - https://github.com/themesberg/flowbite-admin-dashboard
 * 
 * @returns 
 */
export default function Home(){
	return (
			<Dashboard />
	)

}