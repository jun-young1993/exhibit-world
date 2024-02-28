import ExhibitToast from "./exhibit-toast";

export default function ExhibitToastGroup(){
	return (
		<div className="absolute top-0 right-0">
			    <div className="flex flex-col gap-4">
			    	<ExhibitToast />
				<ExhibitToast />
				<ExhibitToast />
				<ExhibitToast />
				<ExhibitToast />
			    </div>
		</div>
	)
}