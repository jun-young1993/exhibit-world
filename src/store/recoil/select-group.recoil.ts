import {atom, selector, useRecoilValue} from "recoil";
import {Group, Object3D} from "three";
import {useThree} from "@react-three/fiber";

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


export default function useSelectedGroupHook(): Group | undefined {
    const selectedUUID = useRecoilValue(selectedGroupSelector);
    const {scene} = useThree();
    let selectedMesh: Group | undefined;
    if (selectedUUID) {
        selectedMesh = scene.getObjectByProperty('uuid', selectedUUID) as Group
        return selectedMesh;
    }
}