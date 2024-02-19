import UnauthrizedException from "Exception/unauthrized.exception";
import Dashboard from "components/home/dashboard";
import Login from "components/home/login";
import { useEffect, useState } from "react";
import { FallbackProps } from "react-error-boundary";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { groupIdsAtom } from "store/recoil/groups.recoil";


export function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {
	const [component, setComponent] = useState(<></>)
	const groupIdsAtomRefresher = useRecoilRefresher_UNSTABLE(groupIdsAtom);
	groupIdsAtomRefresher();
	// resetErrorBoundary();
	useEffect(()=>{
		switch(error){
			case (error instanceof UnauthrizedException) :
				setComponent(<Dashboard defaultMenuItem={<Login />} />)
				return ;
			default:
				setComponent(<Dashboard defaultMenuItem={<>undefined error</>} />)

		}
	},[error])
	return (
		<>
		{component}
		</>
	);
}