import UnauthorizedException from "Exception/unauthrized.exception";
import Dashboard from "components/home/dashboard";
import Login from "components/home/login";
import {ReactNode, useEffect, useState} from "react";
import {FallbackProps} from "react-error-boundary";
import {useToast} from "./store/recoil/toast.recoil";
import {IconType} from "./components/toast/exhibit-toast";
import {isEmpty} from "lodash";
import SideMenu from "./components/home/side-menu";


export function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {
	const [component, setComponent] = useState<ReactNode>(null)
	const {pushToast} = useToast();

	useEffect(()=>{
		if(!isEmpty(error)){
			if((error instanceof UnauthorizedException)){
				pushToast({
					icon: IconType.FAIL,
					content: 'Unauthorized access. Please log in with valid credentials.'
				});
				// setComponent(<Login />)
			}else{
				pushToast({
					icon: IconType.FAIL,
					content: `Oops! Something went wrong. Please try again later. ${error}`
				});
			}

			resetErrorBoundary();

		}
	},[error, pushToast]);


	return (
		<>

		</>
	);
}