import {GroupEntity} from "../clients/entities/group.entity";
import {useRecoilState} from "recoil";
import {selectGroupAtom} from "../store/recoil/select-group.recoil";
import {ThreeEvent, useThree} from "@react-three/fiber";
import GroupFactory from "../clients/factories/group.factory";
import {groupAtom} from "../store/recoil/groups.recoil";
import { useLoader } from '@react-three/fiber'

import GithubStorageClient from "../clients/github-storage.client";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {useEffect, useState} from "react";
import {Group} from "three";


export interface GroupSurface {
    uuid: GroupEntity['id']
    selected?: boolean
}

const githubStorageClient = new GithubStorageClient();
const gltfLoader = new GLTFLoader();
export default function GroupSurface(props: GroupSurface){
    const [object, setObject] = useState<Group | null>(null)




    const {scene} = useThree()
    const [group, setGroup] = useRecoilState(groupAtom(props.uuid));

    useEffect(() => {
        if(object === null){
            githubStorageClient.findOne(group.githubStorage.id)
                .then((content) => {
                    gltfLoader.load(content.download_url,(gltf) => {
                        if(gltf.scene.name == "AuxScene"){
                            // @ts-ignore
                            setObject(gltf.scene.children[0]);
                        }else{
                            setObject(gltf.scene);
                        }

                    })
                })
        }
    },[object])
    const selected = props.selected;
    const [, select] = useRecoilState(selectGroupAtom);
    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        select(group.id);
    }


    return (
        <>
            {object &&
                <primitive
                    uuid={group.id}
                    onPointerUp={handleClick}
                    object={object}
                    castShadow={true}
                    receiveShadow={true}
                />}
        </>
        // <group
        //     onPointerUp={handleClick}
        //     {...groupFactory}
        //
        // >
        //     {meshes.map((mesh) => {
        //         return <Surface object={mesh} key={mesh.id}/>
        //     })}
        //
        //
        // </group>
    )
}