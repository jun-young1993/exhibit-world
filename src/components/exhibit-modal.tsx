import {CustomFlowbiteTheme, Kbd, Modal} from "flowbite-react";
import Exhibit from "./exhibit";
import {useModal} from "../store/recoil/modal.recoild";
import { close } from "inspector";
const customTheme: CustomFlowbiteTheme['modal'] = {
    root: {
        sizes: {
            "full": "max-w-full max-h-full"
        }
    },
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
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {modalState.title}
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <Kbd
                        onClick={() => closeModal()}
                    >
                        ESC
                    </Kbd>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <Modal.Body>
                {modalState.content}
            </Modal.Body>
        </Modal>
    )
}
