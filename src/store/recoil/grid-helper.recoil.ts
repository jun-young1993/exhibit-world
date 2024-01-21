import {atom} from "recoil";
import {v4} from "uuid";

export const gridHelperAtom = atom<string>({
    key: 'gridHelperAtom',
    default: v4()
})