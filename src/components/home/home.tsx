import Dashboard from "./dashboard";
import AuthClient from "clients/auth.client";
import { ExhibitModal } from "components/exhibit-modal";
import ExhibitToastGroup from "components/toast/exhibit-toast-group";


const authClient = new AuthClient();
/**
 * link - https://github.com/themesberg/flowbite-admin-dashboard
 * 
 * @returns 
 */
export default function Home(){
	
	return (
		<>
			<Dashboard />
			<ExhibitToastGroup />
			<ExhibitModal/>
		</>
			
	)

}