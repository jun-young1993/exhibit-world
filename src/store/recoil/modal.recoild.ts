import {atom, useRecoilState} from "recoil";
import {ReactNode, useCallback} from "react";

interface ModalAtomOptions {
    isOpen: boolean;
    content?: ReactNode | string
    onClose?: () => void
}
export const modalAtom = atom<ModalAtomOptions>({
    key: 'modalAtom',
    default: {
        isOpen: false,
        content: undefined,
        onClose : undefined
    }
});

interface ModalOptions {
    content?: ReactNode | string,
    onClose?: () => void
}
export const useModal = () => {
    const [modalState, setModalState] = useRecoilState(modalAtom);

    const closeModal = useCallback(
        () => setModalState(() => {
                if(modalState.onClose){
                    modalState.onClose();
                }
                return {
                    isOpen: false,
                    content: undefined,
                    onClose: undefined
                }
        }),
    [modalState]);

    const openModal = useCallback(
        ({content, onClose}: ModalOptions) => setModalState({
        isOpen: true,
        content: content,
        onClose: onClose
    }),[modalState]);

    return {modalState, openModal, closeModal};
}