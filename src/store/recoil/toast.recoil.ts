
import { ExhibitToastGroupProps, ExhibitToastProperty, ExhibitToastProps } from "components/toast/exhibit-toast.interface";
import { atom, selector, useRecoilCallback } from "recoil"
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
			[]
	)
}

const useRemoveToastHook = function(){
	return useRecoilCallback(
		({snapshot, set}) => 
			(exhibitToastId: ExhibitToastProps['id']) => {
				
				const timer = setTimeout(() => {
					const toasts = snapshot.getLoadable(toastAllAtom).getValue();
					const removedToast = toasts.filter((toast) => toast.id !== exhibitToastId);
					
					set(toastAllAtom,[...removedToast]);
					clearTimeout(timer);
				},1000)
			},
			[]
	)
}

export const useToast = () => {
	const pushToast = useAddToastHook();
	const removeToast = useRemoveToastHook();
	return {pushToast, removeToast};
}