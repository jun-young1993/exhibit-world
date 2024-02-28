import { Alert, Toast, ToastProps } from "flowbite-react";
import { HiFire } from "react-icons/hi";
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
export default function ExhibitToast(){
	return (
	    <Toast theme={theme} className="rtl:divide-x-revers">
		<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
		    <HiFire className="h-5 w-5" />
		</div>
		<div className="ml-3 text-sm font-normal">Set yourself free.</div>
		<Toast.Toggle />
	    </Toast>
// 	<Alert color="warning" withBorderAccent>
// 	<span>
// 	  <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
// 	</span>
//       </Alert>
	)
}