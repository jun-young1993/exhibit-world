import {MeshProps, ThreeEvent, useThree} from "@react-three/fiber";
import selectedMeshStore from "../store/selected-mesh.store";
import {BoxGeometry, BufferGeometry, Material, Mesh} from "three";
import {
    Component,
    createRef, MutableRefObject,
    RefObject, useCallback, useEffect, useRef, useState,
} from "react";
import MaterialControls from "../lib/edit-controls/material.controls";
import GeometryControls from "../lib/edit-controls/geometry.controls";
import {Html, TransformControls} from "@react-three/drei";
import EditContextMenuControls from "../lib/edit-controls/context-menu.controls";
import MeshClient from "../clients/mesh.client";
import ExhibitMeshEntity from "../clients/entities/exhibit-mesh.entity";
import MeshesStore from "../store/meshes.store";
import meshesStore from "../store/meshes.store";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import EditSidebar from "../lib/edit-controls/edit-sidebar";
import MeshEditControls from "../lib/edit-controls/mesh-edit.controls";
import meshSelectedEventEmitter from "../events/mesh-selected.event";
import meshSelectedEvent from "../events/mesh-selected.event";
import meshSelectedOnPointerEventEmitter from "../events/mesh-selected.event";

export interface SurfaceProps extends MeshProps{
    onSelected?: (mesh: Mesh) => void
    select?: boolean
}

export default function Surface(props: SurfaceProps) {
    const { selected , select } = selectedMeshStore();
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



    const geometry = props.geometry as BufferGeometry;
    const material = props.material as Material;
    // const geometry = new BoxGeometry(2, 2, 2);

    return (
        <>
         <mesh
             {...props}
             onClick={handleClick}
             onContextMenu={handleContextMenu}
             onPointerUp={(e) => {
                 if(isCurrentTarget()){
                     meshSelectedOnPointerEventEmitter.emit(`${selected?.uuid}`, selected);
                 }
             }}
         >
             {/*<primitive object={geometry}/>*/}
             {/*<primitive object={material} />*/}
             {/*{props.geometry && <primitive object={props.geometry} />}*/}
             {/*<boxGeometry />*/}
             {/*<meshBasicMaterial />*/}


        </mesh>
            <Html
                fullscreen={true}
            >
                {/*{(selected && isCurrentTarget() && showContext) && (*/}
                {/*        <>*/}
                {/*            /!*<EditContextMenuControls*!/*/}
                {/*            /!*    mesh={selected}*!/*/}
                {/*            /!*//*/}
                {/*            <MeshEditControls*/}
                {/*                mesh={selected}*/}
                {/*            />*/}
                {/*        </>*/}
                {/*)}*/}
                {/*{(selected && isCurrentTarget()) &&*/}
                {/*    <MeshEditControls*/}
                {/*        mesh={selected}*/}
                {/*    />}*/}
            </Html>
        </>
    )
}


