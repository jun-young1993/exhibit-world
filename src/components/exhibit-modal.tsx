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
export const ExhibitModal = () => {
    const {modalState, closeModal} = useModal();
    return (
        <Modal
            theme={customTheme}
            show={modalState.isOpen}
            onClose={() => closeModal()}
            size={"lg"}
            // content={"inner"}
            // popup
        >
            <Modal.Header/>
            <Modal.Body>
                {modalState.content}
            </Modal.Body>
        </Modal>
    )
}
