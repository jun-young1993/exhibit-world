import {CustomFlowbiteTheme, Kbd, Modal} from "flowbite-react";
import Exhibit from "./exhibit";
import {useModal} from "../store/recoil/modal.recoild";
import { close } from "inspector";
const customTheme: CustomFlowbiteTheme['modal'] = {
    root: {
        sizes: {
            "full": "max-w-full max-h-full"
        }
    }
}

interface ExhibitModalProps {
    onClose ?: () => void
}
export const ExhibitModal = (props: ExhibitModalProps) => {
    const {modalState, closeModal} = useModal();
    return (
        <Modal
            theme={customTheme}
            show={modalState.isOpen}
            onClose={() => {
                if(props.onClose){
                    props.onClose();
                }
                closeModal();
            }}
            popup
            size={"lg"}
            onKeyUp={(event) => {
                if(event.code === "Escape"){
                    closeModal();
                }
            }}
        >
            <Modal.Header>{modalState.title}</Modal.Header>
            <Modal.Body>
                {modalState.content}
            </Modal.Body>
        </Modal>
    )
}
