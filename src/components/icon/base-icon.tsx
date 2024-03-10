import { Icon } from "types/icon"
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';
import { MdOutlineSmsFailed } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
interface BaseIconProps {
	icon: Icon
	color: string
}

function className(color: string){
	return `inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-${color}-100 text-${color}-500 dark:bg-${color}-800 dark:text-${color}-200`;
}
export function CheckIcon(){
	return (
	      <div className={className('green')}>
			  <HiCheck className="h-5 w-5" />
	      </div>
	)
}

export function FailIcon(){
	return (
		<div className={className('red')}>
			<MdOutlineSmsFailed className="h-5 w-5" />
		</div>
	)
}

export function InfoIcon(){
	return (
		<div className={className('yellow')}>
			<CiCircleInfo className="h-5 w-5" />
		</div>
	)
}

