import { Button } from "flowbite-react";
import { MouseEvent, MouseEventHandler } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useModal } from "store/recoil/modal.recoild";

export default function DeleteContentModal({
	title,
	onClick
}: {
	title: string, 
	onClick: (event: MouseEvent) => void
}){
	const {closeModal} = useModal();
	return (
		<div className="text-center">
			<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
			<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				{title}
			</h3>
			<div className="flex justify-center gap-4">
			<Button color="failure"
				onClick={(event) => onClick(event)}>
				{"Yes, I'm sure"}
			</Button>
			<Button
				color="gray" onClick={() => closeModal()}>
				No, cancel
			</Button>
			</div>
		</div>
	)
}