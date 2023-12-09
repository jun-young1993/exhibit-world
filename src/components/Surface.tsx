import {MeshProps, ThreeEvent, useThree} from "@react-three/fiber";
import selectedMeshStore from "../store/selected-mesh.store";
import {BufferGeometry, Material, Mesh} from "three";
import {
    useCallback, useEffect, useRef, useState,
} from "react";
import {Html, useGLTF} from "@react-three/drei";
import meshSelectedOnPointerEventEmitter from "../events/mesh-selected.event";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import GltfClient from "../clients/gltf.client";
import {GltfEntity} from "../clients/entities/gltf.entity";
import PreloadGltf from "../utills/preload-gltf";

export interface SurfaceProps extends MeshProps{
    onSelected?: (mesh: Mesh) => void
    select?: boolean
    userData: {[key: string]: any}
}



export default function Surface(props: SurfaceProps) {
    const { selected , select } = selectedMeshStore();
    const [material , setMaterial] = useState(props.material);
    const [geometry, setGeometry] = useState(props.geometry);
    const { scene } = useThree();
    const [showContext, setShowContext] = useState<boolean>(false);

    const handleClick = useCallback((e:  ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            if(isCurrentTarget(e.object.uuid)){
                select(scene.getObjectByProperty('uuid',e.object.uuid) as Mesh | undefined);
            }
    },[select])
    const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
        e.nativeEvent.preventDefault();
        setShowContext(!showContext);
    };
    const isCurrentTarget = (uuid?: string) => {
        return (uuid ?? selected?.uuid) === props.uuid ? true : false;
    }

    useEffect(() => {
        if( selected && showContext === true ){
            setShowContext(false);
        }
    },[selected, showContext])

    useEffect(() => {
        PreloadGltf(props,(glb, mesh) => {
            setMaterial(mesh.material);
            setGeometry(mesh.geometry);
        });
    },[]);


    return (
        <>
         <mesh
             {...props}
             onClick={handleClick}
             onContextMenu={handleContextMenu}
             material={material}
             geometry={geometry}
             onPointerUp={(e) => {
                 if(isCurrentTarget()){
                     meshSelectedOnPointerEventEmitter.emit(`${selected?.uuid}`, selected);
                 }
             }}
         >
        </mesh>
        </>
    )
}


