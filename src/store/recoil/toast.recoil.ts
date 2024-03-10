
import { ExhibitToastGroupProps, ExhibitToastProperty, ExhibitToastProps } from "components/toast/exhibit-toast.interface";
import {atom, selector, useRecoilCallback, useRecoilState} from "recoil"
export const toastGroupSelector = selector<ExhibitToastGroupProps>({
	key: 'toastGroupSelector',
	get: () => {
		return {
			max: 5,
			time: 5000
		}
	}
})

export const toastAllSelector = selector<ExhibitToastProps[] | []>({
	key: 'toastAllSelector',
	get: () => { 
		return [];
	}
});
export const toastAllAtom = atom<ExhibitToastProps[] | []>({
	key: 'toastAllAtom',
	default: toastAllSelector
})

const useAddToastHook = function(){
	const removeToast = useRemoveToastHook();
	return useRecoilCallback(
		({snapshot, set}) => 
			(exhibitToastProps: ExhibitToastProperty) => {
				const toastGroup = snapshot.getLoadable(toastGroupSelector).getValue();
				const toasts = snapshot.getLoadable(toastAllAtom).getValue();

				set(toastAllAtom,[...toasts, {
					...exhibitToastProps,
					id: Date.now()
				}]);

				if(toasts.length >= toastGroup.max){
					removeToast(toasts[0].id);
				}

			},
			[removeToast]
	)
}

const useRemoveToastHook = function(){
	return useRecoilCallback(
		({snapshot, set}) => 
			(exhibitToastId: ExhibitToastProps['id']) => {
				const toasts = snapshot.getLoadable(toastAllAtom).getValue();
				const removeTime = 1000;
				const timer = setTimeout(() => {
					const removedToast = toasts.filter((toast) => toast.id !== exhibitToastId);
					
					set(toastAllAtom,[...removedToast]);
					clearTimeout(timer);
				},removeTime)
			},
			[]
	)
}

export const useToast = () => {
	const pushToast = useAddToastHook();
	const removeToast = useRemoveToastHook();
	const [toasts] = useRecoilState(toastAllAtom);
	return {pushToast, removeToast, toasts};
}