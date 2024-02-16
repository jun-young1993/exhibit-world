import {atom, useRecoilState} from "recoil";
import {ReactNode, useCallback} from "react";

interface ModalAtomOptions {
    isOpen: boolean;
    content?: ReactNode | string
}
export const modalAtom = atom<ModalAtomOptions>({
    key: 'modalAtom',
    default: {
        isOpen: false,
        content: undefined
    }
});

interface ModalOptions {
    content?: ReactNode | string
}
export const useModal = () => {
    const [modalState, setModalState] = useRecoilState(modalAtom);
    
    const closeModal = useCallback(
        () => setModalState(() => {
            return {
                isOpen: false,
                content: undefined
            };
        }),
    [modalState]);

    const openModal = useCallback(
        ({content}: ModalOptions) => setModalState({
        isOpen: true,
        content: content
    }),[modalState]);

    return {modalState, openModal, closeModal};
}