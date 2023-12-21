import {useThree} from "@react-three/fiber";
import {Object3D} from "three";
import {useRecoilValue} from "recoil";
import {selectedGroupSelector} from "../store/recoil/select-group.recoil";



export default function useSelectedGroupHook(): Object3D | undefined
{
    const selectedUUID = useRecoilValue(selectedGroupSelector);
    const {scene} = useThree();
    let selectedMesh: Object3D | undefined;
    if(selectedUUID){
        selectedMesh = scene.getObjectByProperty('uuid',selectedUUID)
        return selectedMesh;
    }
}