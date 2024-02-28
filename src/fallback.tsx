import UnauthrizedException from "Exception/unauthrized.exception";
import Dashboard from "components/home/dashboard";
import Login from "components/home/login";
import { useEffect, useState } from "react";
import { FallbackProps } from "react-error-boundary";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { groupIdsAtom } from "store/recoil/groups.recoil";


export function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {
	const [component, setComponent] = useState(<></>)
	
	console.log(error instanceof UnauthrizedException);
	// resetErrorBoundary();
	useEffect(()=>{
		switch(error){
			case (error instanceof UnauthrizedException) :
				setComponent(<Login />)
				return ;
			default:
				setComponent(<>undefined error</>)

		}
	},[error])
	return (
		<>
		<Dashboard defaultMenuItem={component} />
		</>
	);
}