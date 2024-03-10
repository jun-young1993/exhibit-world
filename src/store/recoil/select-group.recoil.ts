import {atom, selector, useRecoilValue} from "recoil";
import {Group, Object3D} from "three";
import {useThree} from "@react-three/fiber";

export const selectedGroupSelector = selector<string | null>({
    key: 'selectedGroupSelector',
    get: ({get}) => {
        const selectedGroup = get(selectGroupAtom);
        return selectedGroup;
    }
})
export const selectGroupAtom = atom<string | null>({
    key: 'selectGroupAtom',
    default: null
})

/**
 * use Three
 */
export default function useSelectedGroupHook(): Group | undefined {
    const selectedUUID = useRecoilValue(selectedGroupSelector);
    const {scene} = useThree();
    let selectedMesh: Group | undefined;
    if (selectedUUID) {
        selectedMesh = scene.getObjectByProperty('uuid', selectedUUID) as Group
        return selectedMesh;
    }
}