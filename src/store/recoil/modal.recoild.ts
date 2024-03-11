import {atom, useRecoilState} from "recoil";
import {ReactNode, useCallback} from "react";

interface ModalAtomOptions {
    isOpen: boolean;
    content?: ReactNode | string;
    title?: string | ReactNode;
    onClose?: () => void;
}
export const modalAtom = atom<ModalAtomOptions>({
    key: 'modalAtom',
    default: {
        title: "",
        isOpen: false,
        content: undefined,
        onClose : undefined
    }
});

interface ModalOptions {
    content?: ReactNode | string,
    title?: ReactNode | string
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
                    onClose: undefined,
                    title: ""
                }
        }),
    [modalState]);

    const openModal = useCallback(
        ({content, onClose, title }: ModalOptions) => setModalState({
        isOpen: true,
        content: content,
        onClose: onClose,
        title: title ?? ""
    }),[modalState]);

    const setTitle = useCallback(
        (title: string) => setModalState({
            ...modalState,
            title: title
        }),[modalState]
    );

    return {modalState, openModal, closeModal, setTitle};
}