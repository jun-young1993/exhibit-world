import Surface, {SurfaceProps} from "./Surface";
import {GltfEntity} from "../clients/entities/gltf.entity";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {useGLTF} from "@react-three/drei";
import GltfClient from "../clients/gltf.client";
import {Mesh} from "three";
import {useEffect, useMemo, useState} from "react";

export interface GltfSurfaceProps extends SurfaceProps {
    userData: {
        gltf: GltfEntity
    }
}
const gltfClient = new GltfClient();
export default function GltfSurface(props: GltfSurfaceProps) {
    //@ts-ignore
    const { nodes } = useGLTF(gltfClient.getGltfFileUrl(props.userData.gltf.id));
    console.log(nodes);


    return (
        <group>
            {Object.values(nodes).map((node) => {
                if(node instanceof Mesh){

                    const meshProps = node as unknown as SurfaceProps;

                    return <Surface
                        key={node.uuid}
                        {...props}
                        geometry={meshProps.geometry}
                        material={meshProps.material}
                    />
                }
                return null;
            })}
        </group>
    )

}