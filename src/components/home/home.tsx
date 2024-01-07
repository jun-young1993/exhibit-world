import Login from "./login";
import {ThemeProvider} from "@material-tailwind/react";
import Dashboard from "./Dashboard";


/**
 * link - https://github.com/themesberg/flowbite-admin-dashboard
 * 
 * @returns 
 */
export default function Home(){
	return (
		<ThemeProvider>
			<Dashboard />
		</ThemeProvider>
	)

}