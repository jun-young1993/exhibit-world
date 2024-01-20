import {atom} from "recoil";
import {TransformMode} from "../../types/transform";


export const transformModeAtom = atom<TransformMode>({
   key: 'transformModeAtom',
   default: TransformMode.Translate
});
