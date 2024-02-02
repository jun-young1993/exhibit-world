import { atom, useRecoilCallback } from "recoil";

export const globalErrorAtom = atom<string | null>({
	key: 'globalErrorAtom',
	default: null,
      });
      
export const handleGlobalError = useRecoilCallback(
	({ set }) => async (error: any) => {
		if (error.response && error.response.status === 401) {
			set(globalErrorAtom, error.response.message);
		}
	}
);