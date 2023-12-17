import {atom, selector} from "recoil";
import {Object3D} from "three";

export const selectedGroupSelector = selector<String | null>({
    key: 'selectedGroupSelector',
    get: ({get}) => {
        const selectedGroup = get(selectGroupAtom);
        return selectedGroup;
    }
})
export const selectGroupAtom = atom<String | null>({
    key: 'selectGroupAtom',
    default: null
})