import UnauthorizedException from "Exception/unauthrized.exception";
import Dashboard from "components/home/dashboard";
import Login from "components/home/login";
import {ReactNode, useEffect, useState} from "react";
import {FallbackProps} from "react-error-boundary";
import {useToast} from "./store/recoil/toast.recoil";
import {IconType} from "./components/toast/exhibit-toast";
import {isEmpty} from "lodash";
import SideMenu from "./components/home/side-menu";
import {useRecoilState} from "recoil";
import {currentMenuAtom} from "./store/recoil/menu.recoil";
import {loginMenu} from "./store/recoil/items/menu.items";


export function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {

	const { pushToast } = useToast();
	const [ currentMenu, setCurrentMenu ] = useRecoilState(currentMenuAtom);
	const [component, setComponent] = useState(false);
	useEffect(()=>{
		if(!isEmpty(error)){
			if((error instanceof UnauthorizedException)){
				pushToast({
					icon: IconType.FAIL,
					content: 'Unauthorized access. Please log in with valid credentials.'
				});
				setCurrentMenu(loginMenu)
				setComponent(true);
				// setComponent(<Login />)
			}else{
				pushToast({
					icon: IconType.FAIL,
					content: `Oops! Something went wrong. Please try again later. ${error.toString()}`
				});
			}
			resetErrorBoundary()
		}
	},[error, pushToast]);




	return (
		<>
			{component
			? <>{error}</>
			: <></>}
		</>
	);
}