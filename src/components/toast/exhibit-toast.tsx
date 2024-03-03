import {CheckIcon, FailIcon} from "components/icon/base-icon";
import { Alert, Toast, ToastProps } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiFire } from "react-icons/hi";
import { Icon } from "types/icon";
import { ExhibitToastProps } from "./exhibit-toast.interface";
import { toastGroupSelector, useToast } from "store/recoil/toast.recoil";
import { useRecoilValue } from "recoil";
const theme: ToastProps['theme'] = {
	"root": {
	  "base": "flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400",
	  "closed": "opacity-0 ease-out"
	},
	"toggle": {
	  "base": "-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white",
	  "icon": "h-5 w-5 shrink-0"
	}
      };

export enum IconType {
	CHECK = 'CHECK',
	FAIL = 'FAIL'
}
const IconMap = {
	[IconType.CHECK] : <CheckIcon />,
	[IconType.FAIL] : <FailIcon />

}
function ToastIcon({icon}: {icon:IconType}){
	const [node, setNode] = useState<JSX.Element | null>(null)
	
	useEffect(() => {
		if(node === null){
			setNode(IconMap[icon]);
		}
	},[]);
	return (
		<>
			{node}
		</>
	)
}
export default function ExhibitToast({content, id, icon}: ExhibitToastProps){
	const {removeToast} = useToast();
	const toastGroup = useRecoilValue(toastGroupSelector);
	const [removed, setRemoved] = useState(false);
	const onRemoveHandle = () => {
		setRemoved(true);
		removeToast(id);
	}
	
	useEffect(() => {
		
		if(toastGroup.time !== null){
			const timer = setTimeout(() => {
				onRemoveHandle();
			},toastGroup.time)

			return () => clearTimeout(timer);
		}
		
	},[id, removeToast]);
	return (
	    <Toast 
	    	theme={theme}
		className={`transition-opacity duration-1000 opacity-${removed ? 0 : 100}`}
	    >
		<ToastIcon icon={icon ?? IconType.CHECK} />
		<div className="ml-3 text-sm font-normal">{content}</div>
		<Toast.Toggle 
			onDismiss={() => onRemoveHandle()}
		/>
	    </Toast>
	)
}