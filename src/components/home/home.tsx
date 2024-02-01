import Login from "./login";

import Dashboard from "./dashboard";
import {TransformControlsProvider} from "../../context/transform-controls.context";
import AuthClient from "clients/auth.client";

const authClient = new AuthClient();
/**
 * link - https://github.com/themesberg/flowbite-admin-dashboard
 * 
 * @returns 
 */
export default function Home(){
	// authClient.profile()
	// .then((user) => {
	// 	console.log('user',user);
	// })
	// .catch(() => {
	// 	console.log('exception');
	// })
	return (
			<Dashboard />
	)

}