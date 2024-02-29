import { Icon } from "types/icon"
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';

interface BaseIconProps {
	icon: Icon
	backgroundColor: string
}
export default function CheckIcon(){
	return (
	      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
		<HiCheck className="h-5 w-5" />
	      </div>
	)
}