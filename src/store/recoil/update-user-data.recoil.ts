import {atom, useRecoilState} from "recoil";
import {useEffect} from "react";
import ExhibitClient from "../../clients/exhibit.client";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import {GroupEntity} from "../../clients/entities/group.entity";
import {useThree} from "@react-three/fiber";
import {Object3D} from "three";
import GroupClient from "../../clients/group.client";



export const updateUserDataStatusAtom = atom<GroupEntity['id'] | undefined>({
    key: 'updateUserDataStatusAtom',
    default: undefined
});
const exhibitClient = new ExhibitClient();
const exporter = new GLTFExporter();
const groupClient = new GroupClient();
export function useUpdateUserData(){
    const [updateUserDataStatus, setUpdateUserDataStatus] = useRecoilState(updateUserDataStatusAtom);
    const {scene} = useThree();

    useEffect(() => {
        if(updateUserDataStatus !== undefined){
            const updateObject = scene.getObjectByProperty('uuid',updateUserDataStatus);
            if(updateObject instanceof Object3D) {
                exporter.parse(
                    updateObject,
                    (gltf) => {
                        console.log("=>(update-user-data.recoil.ts:31) success user data");
                        groupClient.update(updateUserDataStatus, gltf as ArrayBuffer)
                            .then((update) => {

                            });
                    },
                    (error) => {
                        console.log("=>(transform.controls.tsx:45) error", error);
                    },
                    {
                        trs: true,
                        binary: true,
                        onlyVisible: true,
                        includeCustomExtensions: false
                    }
                )
            }
        }

        return () => {
            setUpdateUserDataStatus(undefined);
        }
    },[updateUserDataStatus])
}