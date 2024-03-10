import { toastAllAtom } from "store/recoil/toast.recoil";
import ExhibitToast from "./exhibit-toast";
import { useRecoilState } from "recoil";

export default function ExhibitToastGroup(){
	const [toasts] = useRecoilState(toastAllAtom);
	return (
		<div className="absolute top-0 right-0">
			    <div className="flex flex-col gap-4">
				{toasts.map((toast) => {
					return <ExhibitToast 
						key={toast.id}
						content={toast.content} 
						id={toast.id}
						icon={toast.icon}
					/>
				})}
			    </div>
		</div>
	)
}