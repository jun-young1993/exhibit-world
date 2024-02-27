import {GroupEntity} from "../clients/entities/group.entity";
import {useRecoilState} from "recoil";
import {selectGroupAtom} from "../store/recoil/select-group.recoil";
import {ThreeEvent, useThree} from "@react-three/fiber";
import GroupFactory from "../clients/factories/group.factory";
import { groupAtomFamily} from "../store/recoil/groups.recoil";
import { useLoader } from '@react-three/fiber'

import GithubStorageClient from "../clients/github-storage.client";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {useEffect, useRef, useState} from "react";
import {Group, Object3D, SpotLight, SpotLightHelper} from "three";
import {useHelper} from "@react-three/drei";
import {ObjectThreeType} from "../types/object-three-type";
import ExhibitSpotLight from "./objects/exhibit-spot-light";



export interface GroupSurface {
    uuid: GroupEntity['id']
    selected?: boolean
}

const githubStorageClient = new GithubStorageClient();
const gltfLoader = new GLTFLoader();
export default function GroupSurface(props: GroupSurface){
    const [object, setObject] = useState<Group | SpotLight | null>(null)


    // useHelper(spotLight, SpotLightHelper, "teal");



    const [group] = useRecoilState(groupAtomFamily(props.uuid));

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
    const [, select] = useRecoilState(selectGroupAtom);
    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        select(group.id);

    }



    return (
        <>
            {object && object instanceof SpotLight &&
                <ExhibitSpotLight object={object} />
            }
            {object && object instanceof Object3D &&
                    <primitive
                        uuid={group.id}
                        onPointerUp={handleClick}
                        object={object}
                        castShadow={true}
                        receiveShadow={true}
                    />

            }


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