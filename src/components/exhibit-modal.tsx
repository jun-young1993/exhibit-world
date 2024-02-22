import {CustomFlowbiteTheme, Modal} from "flowbite-react";
import Exhibit from "./exhibit";
import {useModal} from "../store/recoil/modal.recoild";
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
            // content={"inner"}
            // popup
        >
            <Modal.Header>{modalState.title}</Modal.Header>
            <Modal.Body>
                {modalState.content}
            </Modal.Body>
        </Modal>
    )
}
